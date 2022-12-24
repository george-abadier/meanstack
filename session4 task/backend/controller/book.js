const deal = require('../helper/dealWithFile')
const myConnection = require("../../database/myConnection")
class Book {
    static show = (req, res) => {
        try {
            let data = deal.readFromJson()
            let keys
            if (data.length)
                keys = Object.keys(data[0])
            else
                keys = []
            if (req.params.name) {
                let selectedBooks = data.filter((el) => { return el.name.search(new RegExp(req.params.name, 'i')) == -1 ? false : true })
                res.render('showAll', {
                    pageTitle: 'your library',
                    books: selectedBooks,
                    booksString:JSON.stringify(selectedBooks),
                    keys: keys

                })
            } else {
                res.render('showAll', {
                    pageTitle: 'your library',
                    books: data,
                    booksString:JSON.stringify(data),
                    keys: keys

                })
            }
        }
        catch (e) {
            (req, res) => {
                res.render("error", { pageTitle: 'Some Error', error: e })
            }
        }
    }

    static add = (req, res) => {
        try {
            if (req.method == "GET") {
                res.render("addBook", { pageTitle: 'let`s add' })
            } else {
                let data = deal.readFromJson()
                data.push({ id: Date.now(), ...req.body })
                deal.writeToJson(data)
                res.redirect('/show')
            }
        }
        catch (e) {
            (req, res) => {
                res.render("error", { pageTitle: 'Some Error', error: e })
            }
        }
    }
    static edit = (req, res) => {
        try {
            let data = deal.readFromJson()
            data[data.findIndex(el => el.id == req.params.id)] = { id: parseInt(req.params.id), ...req.body }
            deal.writeToJson(data)
            res.redirect('/show')
        }
        catch (e) {
            (req, res) => {
                res.render("error", { pageTitle: 'Some Error', error: e })
            }
        }
    }
    static delete = (req, res) => {
        try {
            let data = deal.readFromJson()
            data.splice(data.findIndex(el => el.id == req.params.id) , 1)
            deal.writeToJson(data)
            res.redirect('/show')
        } catch (e) {
            (req, res) => {
                res.render("error", { pageTitle: 'Some Error', error: e })
            }
        }
    }
}
module.exports = Book