// TRACE USER STATUS
auth.onAuthStateChanged(user => {
    
    if(user) {
        console.log(user.uid)
    const userId = user.uid;
    ref = db.collection('/users/' + userId + '/expensedata')
        // GET DATA FROM FIREBASE
        console.log('user log in')
        
        ref.onSnapshot(snapshot =>{
        console.log(snapshot.docs)
        setupExpense(snapshot.docs);
        setupUI(user)
    });

    } else {
        console.log('signing out thanks')
        setupExpense([]);
        setupUI()
    }
});

// SEND DATA FROM FORM TO FIREBASE

const form = document.querySelector('#expense-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    // TO THE DATABASE  
    const food = form.querySelector('#food').value
    const transport = form.querySelector('#transport').value
    const other = form.querySelector('#other').value
    const sum  = parseInt(food) + parseInt(transport) + parseInt(other)

    ref.add({
        food : food,
        transport : transport,
        other : other,
        date : today,
        sum : sum
        
    })
    .then(()=>{
        console.log('Added to database')
        form.reset();
    })
    .catch(err=>{
        console.log(err)
    })
    

    // Add the time
})
    
    
// SIGN UP

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit',(e) =>{
    e.preventDefault();

    // GET USER DATA

    const email =  signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    console.log(email,password)

    // STORE IT IN FIREBASE

    auth.createUserWithEmailAndPassword(email,password).then(cred => {
        console.log(cred);
        return db.collection('users').doc(cred.user.uid).set({
            name : signupForm['signup-name'].value
        });    
    })
    .then(() =>{
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset()
        signupForm.querySelector('.error').innerHTML = '';

    })
    .catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    })
})


// SIGN OUT

const logout = document.querySelector('#logout');
logout.addEventListener('click' ,(e)=>{
    e.preventDefault();
    auth.signOut().then(()=>{
        console.log('user sign out')
    })
})


// LOGIN 

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then(cred => {
        console.log(cred.user);

        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset()
        loginForm.querySelector('.error').innerHTML = '';

    })
    .catch(err =>{
        loginForm.querySelector('.error').innerHTML = err.message;
    
    })
})