$(document).ready(function(){

    $('#regModal').submit((e) =>{
        e.preventDefault();
    
        let name = $('#regName').val();
    
        let password = $('#regPassword').val();
    
        let confirm = $('#pwdConfirm').val();

        let matchPwd = true;
    
        let email = $('#regEmail').val().toLowerCase();
    
        let eValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        let emailStatues = eValidate.test(String(email).toLowerCase());
    
        let uniqueUser = false;

        //let emailDB = [];
    
        if(!name || name.length <= 1){alert("Please enter valid name")}
        else if(!emailStatues){alert("Enter Valid email address")}
        else if(!password){alert('Please enter valid password')}
        else if(password !== confirm){
            matchPwd = false;
            alert("Password doesn't match")
        }
    
        if(name && emailStatues && password && matchPwd){
    
            $.ajax({
                url: 'http://localhost:3000/Users',
                method: 'get',
            }).done((e)=>{

                for(let i = 0; i < e.length; i++){
                     if(e[i].email.includes(email)){
                        alert("User already exist");
                        uniqueUser = false; 
                        break;
                     }
                     else{
                         uniqueUser = true;
                     }
                }
                
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
                        $('#regModal').modal('hide');
                    })
        
        
               }

               

            })

        }
        
    })

    $('[data-toggle="tooltip"]').tooltip();

})



