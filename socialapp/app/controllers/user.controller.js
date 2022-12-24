const multer = require('multer')
const userModel = require('../../db/models/user.models')
const helper = require('../helpers')
const { upload } = require('../middleWare')
class User {
    static register = async (req, res) => {
        try {
            const user = new userModel(req.body)
            const result = await user.save()
            helper.formatMyRes(res, 200, true, result, 'you have registered successfully')
        }
        catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static logIn = async (req, res) => {
        try {
            const userData = await userModel.logIn(req.body.email, req.body.password)
            const token = await userData.creatToken()
            helper.formatMyRes(res, 200, true, token, 'you logged in')
        }
        catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static profile = (req, res) => {
        helper.formatMyRes(res, 200, true, req.user, 'user profile fetched')
    }
    static allusers = async (req, res) => {
        try {
            const users = await userModel.find({})
            helper.formatMyRes(res, 200, true, users, 'users fetched')
        }
        catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static logOut = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(h => { return h.token != req.token })
            await req.user.save()
            helper.formatMyRes(res, 200, true, null, 'you logged out')
        } catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static logOutAll = async (req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            helper.formatMyRes(res, 200, true, null, 'you logged out from all devices')
        } catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static getSingle = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id)
            helper.formatMyRes(res, 200, true, user, 'here is your user ')
        }
        catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static changeStatus = async (req, res) => {
        try {
            let user
            if (req.params.id == req.user.id) {
                user = req.user
                console.log('a')
            } else {
                user = await userModel.findById(req.params.id)
            }
            if (req.params.status == 'true')
                req.params.status = true
            else if (req.params.status == 'false')
                req.params.status = false
            else throw new Error('invalid status')
            if (user.status != req.params.status) {
                user.status = !user.status
                await user.save()
            }
            helper.formatMyRes(res, 200, true, null, 'status changed')
        }
        catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static editUser = async (req, res) => {
        try {
            let id
            if (req.url == '/editme') {
                id = req.user._id
                console.log('a')
            } else {
                id = req.params.id
            }
            console.log(req.body)
            const result = await userModel.findByIdAndUpdate(id, { ...req.body }, { returnDocument: 'after' })
            helper.formatMyRes(res, 200, true, result, 'user data changed')

        } catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static deleteUser = async (req, res) => {
        try {
            let id
            if (req.url == '/deleteme') {
                id = req.user._id
            } else {
                id = req.params.id
            }
            const result = await userModel.findByIdAndDelete(id)
            helper.formatMyRes(res, 200, true, result, 'user data changed')

        } catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static addAddress = async (req, res) => {
        try {
            const address = { type: req.body.type, address: req.body.address }
            req.user.addresses.push(address)
            const result = await req.user.save()
            helper.formatMyRes(res, 200, true, result, 'your address added successfully')
        }
        catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static deleteAddress = async (req, res) => {
        try {
            req.user.addresses = req.user.addresses.filter(address => { return address._id != req.params.id })
            const result = await req.user.save()
            helper.formatMyRes(res, 200, true, result, 'the address deleted successfully')
        } catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static showAllAddresses = (req, res) => {
        try {
            helper.formatMyRes(res, 200, true, req.user.addresses, 'here is your adresses')
        }
        catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static showSingleAddress = (req, res) => {
        try {
            helper.formatMyRes(res, 200, true, req.user.addresses.find(address => { return address._id = req.params.id }), 'here is your adresses')
        }
        catch (e) {
            helper.formatMyRes(res, 500, false, e, e.message)
        }
    }
    static uploadMyImage = (req, res) => {

        const uploadThisImage = upload.single('profileImage')
        uploadThisImage(req, res, async function (e) {
            if (e instanceof multer.MulterError)
                helper.formatMyRes(res, 500, false, e, e.message + 'its a multer error')
            else if (e) {
                helper.formatMyRes(res, 500, false, e, e.message + 'another error')
            }
            else {
                try {
                    req.user.image = req.file.path
                    const result = await req.user.save()
                    helper.formatMyRes(res, 200, true, { file: req.file, result }, 'your file uploaded successfully')
                }
                catch(e){
                    helper.formatMyRes(res, 500, false, e, e.message + 'another error')
                }
            }
        })
    }
}
module.exports = User