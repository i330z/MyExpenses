const expenseList = document.querySelector('#expense-list');
const logOutLinks = document.querySelectorAll('.logged-out');
const logInLinks = document.querySelectorAll('.logged-in');
const userName = document.querySelector('.user-name');



//SETUP UI
const setupUI = (user) =>{
    if(user){
        db.collection('users').doc(user.uid).get().then(doc =>{
            const html = `
            <div><h4>Oh hi ${doc.data().name} !!</h4></div>
            `;
            userName.innerHTML = html;
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
            <td>${expense.date}</td>
            <td>${expense.food}</td>
            <td>${expense.transport}</td>
            <td>${expense.other}</td>
            <td>${expense.sum}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete" onclick="del(this)">X</a></td>
        </tr>
    
    `

    html +=li;
    })

        expenseList.innerHTML = html;
   
} else {
    expenseList.innerHTML =  '<h5 class="center-align">Login to view your expenses</h5>';
    }
}










// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});