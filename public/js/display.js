if(typeof(localStorage.getItem('animal')) === undefined){window.location.href = 'http://localhost:3000/animalList.html'}
else{

    $(document).ready(function(){

           // let personObj = JSON.parse(person);

            let data = localStorage.getItem('animal');
    
            let animal = JSON.parse(data)
            
                $('#displaytbody').append(
                    `<tr>
                        <td>
                            <img src='images/${animal.pix}' alt='${animal.name}' style='width:12em; height:10em'/>
                        </td>
                        <td>
                            <div class="dbInfo">Name:<span id="aniName"> ${animal.name}</span></div>
                            <div  class="dbInfo">Species:<span id="aniSpecies"> ${animal.species}</span></div>
                            <div id="aniInfo">${animal.info}</div>
                            <button class="btn btn-primary" data-toggle="modal" data-target="#editModal"><i class="fas fa-edit"></i> Edit</button>
                        </td>
                    </tr>`
            
                )
        
                $('#name').val(animal.name);
                $('#species').val(animal.species);
                $('#info').val(animal.info);
                
                $('#editbtn').click((e) =>{
                    
                    let name = $('#name').val();
                    let species = $('#species').val();
                    let info = $('#info').val();
                    let pix = animal.pix;
        
                    //alert(name);
        
                    $.ajax({
                        url: 'http://localhost:3000/Animal/'+animal.id+'',
                        method: 'put',
                        contentType: "application/JSON",
                        data:JSON.stringify({name, species, info, pix}) 
                    }).done((e) =>{

                        $('#name').val("");
                        $('#species').val("");
                        $('#info').val("");
                        $('#editModal').modal('hide');
                        document.querySelector('#aniName').textContent = " " + name;
                        document.querySelector('#aniSpecies').textContent = " " + species;
                        document.querySelector('#aniInfo').textContent = info;
                        alert("Change successful");
                    
                    })
        
                })

    })
}




