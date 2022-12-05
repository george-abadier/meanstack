
const userData = ['User_ID', 'User_Name', 'User_Age', 'User_Email'],validation={User_ID:/[0-9]{14}/,User_Name:/^[a-zA-z]{3,}([ ]+[a-zA-Z]{3,}$)+/,User_Email:/^[a-zA-z0-9._%+-]+@[a-zA-Z0-9.-]+(?:\.[a-z]{2,4})$/}
function readFromLocalStorage(key = 'users', resType = 'json') {
    let users = localStorage.getItem(key)
    if (resType == 'json') {
        try {
            users = JSON.parse(users) || []
        }
        catch {
            users = []
        }
    }
    return users
}
function writeToLocalStorage(data, key = 'users') {
    localStorage.setItem(key, JSON.stringify(data))
}
function tableAppend(arrOffObjects, tableElement) {
    console.log(arrOffObjects)
    tableElement.firstElementChild.innerHTML = ''
    tableElement.lastElementChild.innerHTML = ''
    if (arrOffObjects.length == 0) {
        alert('There is no data to display')
    } else {
        const thead = document.createElement('tr')
        const ths = Object.keys(arrOffObjects[0])
        ths.forEach(h => {
            const th = document.createElement('th')
            th.innerHTML = h
            th.setAttribute('scope', 'col')
            thead.appendChild(th)
        })
        tableElement.firstElementChild.appendChild(thead)
        arrOffObjects.forEach(element => {
            const tr = document.createElement('tr')
            let userObj = {}
            // const form = document.createElement('form')
            for (prop in element) {
                let td
                if (prop == "User_Name" || prop == "User_ID") {
                    userObj[prop] = element[prop]
                    td = document.createElement('th')
                    td.setAttribute('scope', 'row')
                    td.innerHTML = element[prop]
                } else if (prop == 'User_Status') {
                    td = document.createElement('td')
                    const signIn = document.createElement('input')
                    signIn.setAttribute('type', 'radio')
                    signIn.setAttribute('class', 'btn-check')
                    signIn.setAttribute('name', prop+element['User_ID'])
                    signIn.setAttribute('autocomplete', 'off')
                    signIn.setAttribute('id', 'signIn' + element['User_ID'])
                    signIn.setAttribute('value', '1')
                    const signInLabel = document.createElement('label')
                    signInLabel.setAttribute('class', 'btn btn-outline-success')
                    signInLabel.setAttribute('for', 'signIn' + element['User_ID'])
                    signInLabel.innerHTML = "sign in"
                    const signOut = document.createElement('input')
                    signOut.setAttribute('type', 'radio')
                    signOut.setAttribute('class', 'btn-check')
                    signOut.setAttribute('name', prop+element['User_ID'])
                    signOut.setAttribute('autocomplete', 'off')
                    signOut.setAttribute('id', 'signOut' + element['User_ID'])
                    signOut.setAttribute('value', '0')
                    const signOutLabel = document.createElement('label')
                    signOutLabel.setAttribute('class', 'btn btn-outline-danger')
                    signOutLabel.setAttribute('for', 'signOut' + element['User_ID'])
                    signOutLabel.innerHTML = "sign out"
                    if (element[prop] == true) {
                        signIn.setAttribute('checked', true)
                    } else if (element[prop] == false) {
                        signOut.setAttribute('checked', true)
                    }
                    td.appendChild(signIn)
                    td.appendChild(signInLabel)
                    td.appendChild(signOut)
                    td.appendChild(signOutLabel)
                    userObj[prop] = td
                } else {
                    td = document.createElement('td')
                    const input = document.createElement('input')
                    if (prop =='User_Age') {
                        input.setAttribute('type', 'number')
                        input.setAttribute('min', '0')
                        input.setAttribute('max', '120')
                    } else {
                        input.setAttribute('type', 'text')
                        if(validation[prop]){
                            input.setAttribute('pattern',validation[prop])
                            input.addEventListener('blur',function(e){validateInput(e)})
                        }
                    }
                    input.setAttribute('class', 'form-control')
                    input.value = element[prop]
                    input.setAttribute('name', prop)
                    td.appendChild(input)
                    userObj[prop] = input
                }
                tr.appendChild(td)
            }
            td = document.createElement('td')
            const saveInput = document.createElement('button')
            saveInput.setAttribute('type', 'button')
            saveInput.setAttribute('class', 'btn btn-primary')
            saveInput.innerHTML = 'save changes'
            td.appendChild(saveInput)
            saveInput.addEventListener('click', function () { updateUserData(userObj) })
            const deleteInput = document.createElement('button')
            deleteInput.setAttribute('type', 'button')
            deleteInput.setAttribute('class', 'btn btn-warning')
            deleteInput.innerHTML = 'Delete User'
            td.appendChild(deleteInput)
            deleteInput.addEventListener('click', function () { deleteUser(userObj.User_ID, tr) })
            tr.appendChild(td)
            // .appendChild(form)
            tableElement.lastElementChild.appendChild(tr)
        })
    }

}
function validateInput(e){
    regExp=new RegExp(validation[e.target.getAttribute('name')])
if(!regExp.test(e.target.value)){
    e.target.focus()
}
}
function updateUserData(userNewData) {
    const data = readFromLocalStorage()
    const selectedUserIndex = data.findIndex((element) => { return element.User_ID == userNewData.User_ID })
    for (prop in data[selectedUserIndex]) {
        if (prop == 'User_Status') {
            data[selectedUserIndex][prop] = (userNewData[prop].firstElementChild.checked)
        } else if (prop == 'User_Age' || prop == 'User_Email') {
            console.log(userNewData[prop].value)
            data[selectedUserIndex][prop] = userNewData[prop].value
        }
    }
    writeToLocalStorage(data)
}
function deleteUser(id, row) {
    data = readFromLocalStorage()
    data.splice(data.findIndex((element) => { return element.User_ID == id }) - 1, 1)
    //    data.forEach((element,index,arr)=>{
    //     if(element.User_ID==id){
    //         arr.splice(index-1,1)
    //     }
    //    })
    writeToLocalStorage(data)
    row.style.display = 'none'
}
if (document.getElementById('signUp')) {
    document.getElementById('signUp').onsubmit = (e) => {
        e.preventDefault()
        const users = readFromLocalStorage()
        const newUser = {}
        userData.forEach(information => newUser[information] = e.target.elements[information].value)
        newUser.User_Status = false
        if(users.find((e)=>{return e.User_ID== newUser.User_ID})){
            alert('this national ID is exist already make sure that you write you correct national id')
        }else{
            users.push(newUser)
            writeToLocalStorage(users)
            document.getElementById('signUp').reset()
        }
    }
}
if (document.getElementById('displayBtn')) {
    document.getElementById('displayBtn').addEventListener('click', async () => {

        tableAppend(readFromLocalStorage(), document.getElementById('displayTable'))
    })
}