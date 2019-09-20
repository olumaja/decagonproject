$(document).ready(function(){

    $('#regModal').submit((e) =>{
        e.preventDefault();
    
        let name = $('#name').val();
    
        let password = $('#password').val();
    
        let confirm = $('#pwdConfirm').val();
    
        let email = $('#email').val();
    
        let eValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        let emailStatues = eValidate.test(String(email).toLowerCase());
    
        let uniqueUser = true;
    
        if(!name || name.length <= 1){alert("Please enter valid name")}
    
        if(!emailStatues){alert("Enter Valid email address")}
    
        if(!password){alert('Please enter valid password')}
    
        if(password !== confirm){alert("Password doesn't match")}
    
        if(name && emailStatues && password ){
    
            $.ajax({
                url: 'http://localhost:3000/Users',
                method: 'get',
            }).done((e)=>{
                for(let i = 0; i < e.length; i++){
                    if(e[i].email.includes(email)){
                        alert("User already exit");
                        break;
                    }
                    else{
                        uniqueUser = false;
                    }
                }
            })
    
        }
    
        if(emailStatues){
    
            if(uniqueUser){
    
                $.ajax({
                    url: 'http://localhost:3000/Users',
                    method: 'post',
                    data: {name, email, password}
    
                }).done((e)=>{
    
                    $('#name').val("");
                    $('#email').val("");
                    $('#password').val("");
                    $('#pwdConfirm').val("");
    
                    alert("Success! Please sign in");
                    
                })
    
    
           }
    
        }
    
        //window.location.href = "http://localhost:3000/display.html"
    })

})



