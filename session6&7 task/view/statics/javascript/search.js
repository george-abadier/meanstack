// document.getElementById("search").onchange = () => {
//     console.log(document.getElementById("search").value)
//     document.getElementById("searchAnchor").setAttribute('href', "/show" + document.getElementById("search").value==""?"":"/"+document.getElementById("search").value)
// }
// document.getElementById('sortByNum').onclick=()=>{
//     const trs= document.getElementsByTagName('tr')
//     const bodytrs=[]
//     for(let i=2 ;i<trs.length;i++){
//         let bodytr={}
//         bodytr.num=trs[i].querySelector('[type=number]').value
//         bodytr.tr=trs[i]
//         bodytrs.push(bodytr)
//     }
//     bodytrs.sort((a, b) => { return a.num - b.num})
//     document.getElementsByTagName('tbody')[0].innerHTML=''
//     bodytrs.forEach(tr=>document.getElementsByTagName('tbody')[0].appendChild(tr.tr))

//     // trs.forEach(tr=>{console.log(tr)})
//     // console.log(document.getElementsByTagName("tbody")[0].innerHTML)
//     // document.getElementsByTagName("tbody")[0]
//     // const data=JSON.parse(document.querySelector('input[type=hidden]').value)
//     // data.sort((a, b) => { return a.numOfPages - b.numOfPages })
//     // console.log(data[0])
//     // tableAppend(data, document.getElementsByTagName("table")[0])
//     // console.log(document.getElementsByTagName("tbody")[0].innerHTML)
// }
// document.getElementById('sortByName').onclick=()=>{
//     const trs= document.getElementsByTagName('tr')
//     const bodytrs=[]
//     for(let i=2 ;i<trs.length;i++){
//         let bodytr={}
//         bodytr.name=trs[i].querySelector('[name=name]').value
//         bodytr.tr=trs[i]
//         bodytrs.push(bodytr)
//     }
//     console.log(bodytrs)
//     bodytrs.sort((a, b) => {
//          let x=a.name.toLowerCase()
//          let y=b.name.toLowerCase()
//          if(x<y){return -1}
//          if(y<x){return 1}
//          return 0
//     })
//     console.log(bodytrs)
//     document.getElementsByTagName('tbody')[0].innerHTML=''
//     bodytrs.forEach(tr=>document.getElementsByTagName('tbody')[0].appendChild(tr.tr))

//     // trs.forEach(tr=>{console.log(tr)})
//     // console.log(document.getElementsByTagName("tbody")[0].innerHTML)
//     // document.getElementsByTagName("tbody")[0]
//     // const data=JSON.parse(document.querySelector('input[type=hidden]').value)
//     // data.sort((a, b) => { return a.numOfPages - b.numOfPages })
//     // console.log(data[0])
//     // tableAppend(data, document.getElementsByTagName("table")[0])
//     // console.log(document.getElementsByTagName("tbody")[0].innerHTML)
// }
// // function tableAppend(arrOffObjects, tableElement) {
// //     tableElement.lastElementChild.innerHTML =""
// //     arrOffObjects.forEach(element => {
// //         debugger
// //         const tr = document.createElement('tr')
// //         const form = document.createElement('form')
// //         form.setAttribute('action', "/edit/" + element.id + "")
// //         form.setAttribute('method', "post")
// //         tr.appendChild(form)
// //         // let userObj = {}
// //         for (prop in element) {
// //             let td
// //             console.log(element[prop])
// //             if (prop == "id") {
// //                 // userObj[prop] = element[prop]
// //                 td = document.createElement('th')
// //                 td.setAttribute('scope', 'row')
// //                 td.innerHTML = element[prop]
// //             } else {
// //                 td = document.createElement('td')
// //                 const input = document.createElement('input')
// //                 form.elements.push(input)
// //                 if (prop == 'numOfPages') {
// //                     input.setAttribute('type', 'number')
// //                     input.setAttribute('min', '0')
// //                 } else {
// //                     input.setAttribute('type', 'text')
// //                 }
// //                 input.setAttribute('class', 'form-control')
// //                 input.setAttribute('name', prop)
// //                 input.setAttribute('value',element[prop]) 
// //                 td.appendChild(input)
// //                 // userObj[prop] = input
// //             }
// //             tr.appendChild(td)
// //         }
// //         const td = document.createElement('td')
// //         const saveInput = document.createElement('input')
// //         form.elements.push(saveInput)
// //         saveInput.setAttribute('type', 'submit')
// //         saveInput.setAttribute('class', 'btn btn-success mx-3')
// //         // saveInput.innerHTML = 'save changes'
// //         td.appendChild(saveInput)
// //         tr.appendChild(td)
// //         // saveInput.addEventListener('click', function () { updateUserData(userObj) })
// //         const deleteAnchor = document.createElement('a')
// //         deleteAnchor.setAttribute('href', "/del/" + element.id)
// //         deleteAnchor.setAttribute('class', 'btn btn-danger mx-3')
// //         deleteAnchor.innerHTML = 'Delete'
// //         const lastTd = document.createElement('td')
// //         lastTd.appendChild(deleteAnchor)
// //         // deleteInput.addEventListener('click', function () { deleteUser(userObj.User_ID, tr) })
// //         tr.appendChild(lastTd)
// //         // .appendChild(form)
// //         tableElement.lastElementChild.appendChild(tr)
// //     })


// // }
const ourCheckBoxs=document.querySelectorAll('td input[type=checkbox]')
ourCheckBoxs.forEach(checkBox=>{
    checkBox.onchange=(e)=>{
        fetch(`/changestatus/${checkBox.getAttribute('id')}/${checkBox.checked}`)
        .then(result=>{console.log(result)})
        .catch(e=>{console.log(e.message)})
    }
})