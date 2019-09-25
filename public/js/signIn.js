$(document).ready(function(){

    $('#signModal').submit((e)=>{

        e.preventDefault();
        
        let password = $('#signPassword').val();
        let email = $('#signEmail').val().toLowerCase();
        let validity = false;

        if(!email || !password){
            alert("Enter a valid email address and password");
        }
        else if(email && password){
                $.ajax({
                    url: 'http://localhost:3000/Users',
                    method: 'get',
                }).done((e)=>{

                    for(let i = 0; i < e.length; i++){
                        if(e[i].email.includes(email) && e[i].password.includes(password)){
                            validity = true; 
                            localStorage.setItem("person",JSON.stringify(e[i]));
                            break;
                        }
                        
                    }

                if(validity){

                        $('#signModal').modal('hide');
                    
                            window.location.href = "http://localhost:3000/animalList.html"

                    }

                    if(!validity){alert('Username or password is not correct!')}

                })
        }
            
    })

})