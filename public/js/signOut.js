$(document).ready(function(){

    $('#signOut').click(function(){
        localStorage.clear();
        window.location.href = 'http://localhost:3000';
    })

})