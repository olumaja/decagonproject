
$(document).ready(function(){
    let data = localStorage.getItem('animal');

    // $.ajax({
    //     url: 'http://localhost:3000/Animal',
    //     method: 'get',
    // }).done((e)=>{



    // })

    // $('#name').val(animal.name);

    // $('#species').val(animal.species);

    // $('#info').val(animal.info);


    let animal = JSON.parse(data)
    
    
        $('#displaytbody').append(
            `<tr>
                <td>
                    <img src='images/${animal.pix}' />
                </td>
                <td>
                    <div><span id="dbInfo">Name: ${animal.name}</span></div>
                    <div><span id="dbInfo">Species: ${animal.species}</span></div>
                    <div>${animal.info}</div>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#editModal"><i class="fas fa-edit"></i> Edit</button>
                </td>
            </tr>`
    
        )
        
        $('#editbtn').click((e) =>{
            
            let name = $('#name').val();
            let species = $('#species').val();
            let info = $('#info').val();

            $.ajax({
                url: 'http://localhost:3000/Animal/'+animal.id+'',
                method: 'put',
                contentType: "application/JSON",
                data:JSON.stringify({name, species, info}) 
            }).done((e) =>{
                alert("Change successful");
            })

        })
})



