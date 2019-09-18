let count = 0;

$.ajax({
    url: 'http://localhost:3000/Animal',
    method: 'get',
}).done((e)=>{
        //alert(e)
        for (let i = 0; i < e.length; i++){
            $('#tbody').append(
                `<tr id="tr-${e[i].id}">
                    <td>${i + 1}
                    </td>
                    <td>
                        <img src='images/${e[i].pix}' alt='${e[i].name}' style="width:8em; height:6em">
                    </td>
                    <td>
                        ${e[i].name} 
                    </td>
                    <td>
                        ${e[i].species} 
                    </td>
                    <td>
                            ${e[i].info.slice(0,200) + '...<br><a href="#" id="read" onclick="newDisplay(' +`${e[i].id}`+ ')">View More</a>' }
                    </td>
                    <td>
                        <button id="del-${e[i].id}" class="btn btn-danger delete-btn">Delete</button>
                        <button id="edt-${e[i].id}" class="btn btn-primary edit-btn">Edit</button>
                    </td>
                        
                </tr>`

                    )

                    count++;

                }

                //Delete function
                $('.delete-btn').on('click', (e) =>{
                    let id = e.target.id.split('del-').join('');
                    //alert(id);

                    $.ajax({
                        url:`http://localhost:3000/Animal/${id}`,
                        method: 'delete'
                    }).done((e) =>{
                        $(`#tr-${id}`).fadeOut(500);
                    })
                })

                $('.edit-btn').on('click', (e) =>{
                    let edId = e.target.id.split('edit-').join('');

                    $.ajax({
                        url:`http://localhost:3000/Animal/${edId}`,
                        method: 'put'
                    }).done((e) =>{

                    })
                })

})

$('#zooModal').submit((e)=>{
    e.preventDefault()
    let pic = ['lion', 'tiger', 'parrot', 'zebra', 'cheetah', 'gorilla', 'elephant', 'tortoise', 'koala', 'leopard', 'giraffe','deer'];
    let name = $('#name').val();
    let species = $('#species').val();
    let info = $('#info').val();
    let pix = "";
    let picName = "";
    picName = name.toLowerCase();
    alert(picName);
    for(let i = 0; i < pic.length; i++){
        
        if(pic[i] == picName){
            pix = pic[i] + ".jpg";
        }
        else{
            pix = "sliderImg.jpg";
        }
    }
    
    $.ajax({
        url: 'http://localhost:3000/Animal',
        method: 'post',
        data: {
            name, species, info, pix
}
}).done((e)=>{
$('#tbody').append(
`<tr>
<td>
       ${count + 1} 
    </td>
    <td>
        <img src="${e.pix}" alt="${picName}" style="width:8em; height:6em">
        </td>
<td>
       ${e.name} 
    </td>
    <td>
    ${e.species} 
    </td>
    <td>
        ${e.info.slice(0,200) + '...<br><a href="#" id="read">View More</a>' }
        </td>
        <td>
        <button id="del-${e.id}" class="btn btn-danger delete-btn">Delete</button>
        <button id="edt-${e.id}" class="btn btn-primary edit-btn">Edit</button>
        </td>
        </tr>`
        )
        
        $('#name').val('');
        $('#species').val('');
        $('#info').val('');
        //$('#address').val('')
        
    })
})

function newDisplay(myId){
    let myStore = localStorage.setItem("id", "'" + myId + "'");
    //alert(myStore);
}