window.addEventListener('DOMContentLoaded', function(){

    let regexName = RegExp('^[A-Z]{1}[a-z]{2,}$');
    let regexEmail = RegExp('^[a-z]{1,}[0-9]{1,}[@][a-z]{1,10}[.]{1}[com]{1,3}$');
    let regexPass = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!#]*)[a-zA-Z0-9@!#*]{8,}$');
    let regexMobile = RegExp('^[6-9]{1}[0-9]{9,}$')


    const enterName = document.getElementById('enterName');
    const enterEmail = document.getElementById('enterEmail');
    const loginEmail = document.getElementById('enterEmail2');
    const loginPassword = document.getElementById('enterPassword2')
    const loginButton = document.getElementById('loginButton')
    const enterPassword = document.getElementById('enterPassword');
    const enterMobileNumber = document.getElementById('enterMobileNumber');
    const wrongName = document.getElementById('wrongName');
    const wrongEmail = document.getElementById('wrongEmail');
    const wrongPassword = document.getElementById('wrongPassword');
    const wrongMobileNumber = document.getElementById('wrongMobileNumber');
    const wrongEmail2 = document.getElementById('wrongEmail2');
    const wrongPassword2 = document.getElementById('wrongPassword2');
    const loginHead = document.getElementById('loginHead');
    const signupHead = document.getElementById('signupHead');
    const loginDetails = document.getElementById('loginDetails');
    const signupDetails = document.getElementById('signupDetails');


    const signupButton = document.getElementById('signupButton');

    let name;
    let email;
    let password;
    let mobileNumber;
    let inEmail;
    let inPassword;


    let field1 = false;
    let field2 = false;
    let field3 = false;
    let field4 = false;
    let field5 = false;
    let field6 = false;


    enterName.addEventListener('change', function() {
        name = enterName.value;
    })

    enterEmail.addEventListener('change', function() {
        email = enterEmail.value;
        console.log(email);
    })

    enterPassword.addEventListener('change', function() {
        password = enterPassword.value;
    })

    enterMobileNumber.addEventListener('change', function() {
        mobileNumber = enterMobileNumber.value;
        console.log(mobileNumber);
    })

    loginHead.addEventListener('click', function() {
        signupDetails.style.display = 'none';
        loginDetails.style.display = "flex";
    })

    signupHead.addEventListener('click', function() {
        signupDetails.style.display = 'flex';
        loginDetails.style.display = "none";
    })

// SIGNUP PAGE

    signupButton.addEventListener('click', function() {

        let isNameValid = regexName.test(name)
        if(isNameValid == false) {
        enterName.style.border = "1px solid red"
        wrongName.style.visibility = "visible"
        }
        else if (isNameValid == true) {
        field1 = true;
        enterName.style.border = "1px solid green"
        wrongName.style.visibility= "hidden"
        }

      

        let isEmailValid = regexEmail.test(email)
        if(isEmailValid == false) {
        enterEmail.style.border = "1px solid red"
        wrongEmail.style.visibility = "visible"

        }
        else if (isEmailValid == true) {
        field2 = true;
        enterEmail.style.border = "1px solid green"
        wrongEmail.style.visibility = "hidden"
        }
       
        let isPasswordValid = regexPass.test(password)
        if(isPasswordValid == false) {
        enterPassword.style.border = "1px solid red"
        wrongPassword.style.visibility = "visible"

        }
        else if (isPasswordValid == true) {
        field3 = true;
        enterPassword.style.border = "1px solid green"
        wrongPassword.style.visibility = "hidden"
        }

        let isMobileValid = regexMobile.test(mobileNumber)
        if(isMobileValid == false) {
            enterMobileNumber.style.border = "1px solid red"
            wrongMobileNumber.style.visibility = "visible"
        }

        else if(isMobileValid == true) {
            field4 = true;
            enterMobileNumber.style.border = "1px solid green"
            wrongMobileNumber.style.visibility = "hidden"
        }

        console.log(field1, field2, field3, field4)

        if((field1 = true) && (field2 =true) && (field3 =true) && (field4 =true)){

            let signupObj = {
                fullName: name,
                email: email,
                password: password,
                phone: mobileNumber,

            }
            console.log(signupObj)

            requirejs(['../service/dataService.js'], (methods)=>{
                console.log(methods)
                console.log("kljhghvjbk")

                methods.signup(signupObj).then(function(response){
                    console.log(response)
                    console.log(response.status)
                    // console.log(response.data.result.id)
                    localStorage.setItem('token', response.data.result.accessToken)
                    console.log(response.data.result.accessToken)
                })
            });
        }

       
    })



    // LOGIN PAGE

    loginEmail.addEventListener('change', function() {
        inEmail = loginEmail.value;
    })

    loginPassword.addEventListener('change', function() {
        inPassword = loginPassword.value;
    })

    loginButton.addEventListener('click', function () {
        let isEmailValid = regexEmail.test(inEmail)
        if (isEmailValid == false) {
            loginEmail.style.border = "1px solid red"
            wrongEmail2.style.visibility= "visible"
            // ehelper.style.color = "red"

        }
        else if (isEmailValid == true) {
            field1 = true;
            loginEmail.style.border = "1px solid green"
            wrongEmail2.style.visibility = "hidden"
        }

        let isPasswordValid = regexPass.test(inPassword)
        if (isPasswordValid == false) {
            loginPassword.style.border = "2px solid red"
            wrongPassword2.style.visibility = "visible"
            // passhelper.style.color = "red"
        }
        else if (isPasswordValid == true) {
            field2 = true;
            loginPassword.style.border = "1px solid green"
            wrongPassword2.style.visibility = "hidden"
        }
        console.log("helloo")
        console.log(field2)
        console.log(field1)

        if ((field5 = true) && (field6 = true)) {

            console.log("signin")
            let loginObj =
            {
                "email": inEmail,
                "password": inPassword,
            }
            console.log(loginObj)
            requirejs(['../service/dataService.js'], (methods) => {

                console.log(methods)
                console.log('hii')
                methods.signin(loginObj).then(function (loginResponse) {
                    console.log(loginResponse)
                    console.log(loginResponse.status)
                    if(loginResponse.status == 200){
                        // window.location = "http://localhost:5500/Pages/BookListing.html";
                    }
                    localStorage.setItem('token',  loginResponse.data.result.accessToken)
                    console.log(loginResponse.data.result.accessToken)
                })

            });
        }

    })







})