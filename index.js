const expenseList = document.querySelector('#expense-list');
const logOutLinks = document.querySelectorAll('.logged-out');
const logInLinks = document.querySelectorAll('.logged-in');
const userName = document.querySelector('.user-name');
const profilePic = document.querySelector('#profile-img');


//SETUP UI
const setupUI = (user) =>{
    if(user){
        db.collection('users').doc(user.uid).get().then(doc =>{
            const html = `
            <div>
            <p><b>Name</b> :  ${doc.data().name}</p>
            <p><b>Occupation</b> : ${doc.data().occupation}
            </div>
            `;
            userName.innerHTML = html;

            const profile = `
            <img src= ${doc.data().profile_picture} height:"200px" width="200px" style="border-radius: 50%;">
            `
            profilePic.innerHTML =profile;
        })

        logInLinks.forEach(item => item.style.display = 'block');
        logOutLinks.forEach(item => item.style.display = 'none');
    } else {
        userName.innerHTML = ''
        logInLinks.forEach(item => item.style.display = 'none');
        logOutLinks.forEach(item => item.style.display = 'block');
    }
}



// SETUP UI INFO

const setupExpense = (data) => {
    if(data.length){
        let html ='';
        data.forEach(doc =>{
        const expense = doc.data()

    const li = `
    <tr data-id="${doc.id}">
            <td></td>
            <td id ="date">${expense.date}</td>
            <td id ="food">${expense.food}</td>
            <td id ="transport">${expense.transport}</td>
            <td id ="other">${expense.other}</td>
            <td id ="total">${expense.sum}</td>
            <td>
            <a href="#" class="btn btn-danger btn-sm delete" onclick="del(this)">X</a>
            <a href="#" class="btn btn-danger btn-sm delete" onclick="edit(this)">U</a>
            </td>
        </tr>
    
    `

    html +=li;
    })

        expenseList.innerHTML = html;
   
} else {
    expenseList.innerHTML =  '<h5 class="center-align">Login to view your expenses</h5>';
    }
}


//DELETE A ROW
function del (data) {
    let id = data.parentElement.parentElement.getAttribute('data-id');
    ref.doc(id).delete();
}


//UPDATING THE DATA

function edit (data){
    let id = data.parentElement.parentElement.getAttribute('data-id');
    console.log(id);
    currentUserId = id;
    // const table = document.querySelector('.table');
    const row = document.querySelector('[data-id='+id+']');
    // const tabledate = row.querySelector('#food').value;
    updateForm.style.display = "block";
    form.style.display = "none";
    console.log(currentUserId);
    updateForm.querySelector('#food').value = row.querySelector('#food').innerHTML;
    updateForm.querySelector('#transport').value = row.querySelector('#transport').innerHTML;
    updateForm.querySelector('#other').value = row.querySelector('#other').innerHTML;
    // console.log(row.querySelector('#food').innerHTML);
}









// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});