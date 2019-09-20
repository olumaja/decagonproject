$(document).ready(function(){

    $('#signModal').submit((e)=>{

        e.preventDefault();
        
        let password = $('#password').val();
        let email = $('#email').val();
        let eValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailStatues = eValidate.test(String(email).toLowerCase());
        let findemail = false;
        let findpassword = false;

        if(emailStatues){

            $.ajax({
                url: 'http://localhost:3000/Users',
                method: 'get',
            }).done((e)=>{

                for(let i = 0; i < e.length; i++){
                    if(e[i].email.includes(email)){
                        findemail = true; 
                    }
                    if(e[i].password.includes(password)){
                        findemail = true;
                    }
                }

                if(!findemail || !findpassword){alert('Username or password is not correct!')}

                if(findemail && findpassword){

                    localStorage.setItem("person",JSON.stringify(e));

                    window.location.href = "http://localhost:3000/animalList.html"

                }

            })
        }

    })

})