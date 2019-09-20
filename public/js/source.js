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
                            ${e[i].info.slice(0,200) + `...<br><button id="read" class="btn btn-outline-info btn-small info-btn" onclick='newDisplay(${JSON.stringify(e[i])})'>View More</button>` }
                    </td>
                    <td>
                        <button id="del-${e[i].id}" class="btn btn-danger delete-btn"><i class="far fa-trash-alt"></i></button>
                        <button id="edt-${e[i].id}" class="btn btn-primary edit-btn" onclick='newDisplay(${JSON.stringify(e[i])})'><i class="far fa-edit"></i> Edit</button>
                    </td>
                        
                </tr>`

                    )

                    count++;

                }

                //Delete function
                $('.delete-btn').on('click', (e) =>{
                    let delId = e.target.id.split('del-').join('');
                    //alert(id);

                    $.ajax({
                        url:`http://localhost:3000/Animal/${delId}`,
                        method: 'delete'
                    }).done((e) =>{
                        $(`#tr-${delId}`).fadeOut(500);
                    })
                })

})

$('#zooModal').submit((e)=>{
    e.preventDefault()
    let pic = ['lion', 'tiger', 'parrot', 'zebra', 'cheetah', 'gorilla', 'elephant', 'tortoise', 'koala', 'leopard', 'giraffe','deer', 'monkey', 'gorilla', 'zebra', 'monkey'];
    let name = $('#name').val();
    let species = $('#species').val();
    let info = $('#info').val();
    let pix = "";
    let picName = "";
    picName = name.toLowerCase();
    //alert(picName);
    for(let i = 0; i < pic.length; i++){
        
       /* if(pic[i] == picName){
            pix = pic[i] + ".jpg";
            break;
            
        }
        else{
            pix = "sliderImg.jpg";
            
        }*/
        if(pic[i].includes(picName)){
            pix = pic[i] + ".jpg";
        }
        else{pix = "sliderImg.jpg";}
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
        <img src="images/${pix}" alt="${picName}" style="width:8em; height:6em">
        </td>
<td>
       ${e.name} 
    </td>
    <td>
    ${e.species} 
    </td>
    <td>
        ${e.info.slice(0,200) + '...<br><button class="btn btn-outline-info" id="read" onclick="newDisplay(${JSON.stringify(e[i])})" >View More</button>' }
        </td>
        <td>
        <button id="del-${e.id}" class="btn btn-danger delete-btn"><i class="far fa-trash-alt"></i></button>
        <button id="edt-${e.id}" class="btn btn-primary edit-btn" onclick='newDisplay(${JSON.stringify(e)})'><i class="far fa-edit"></i> Edit</button>
        
        </td>
        </tr>`
        )
        
        $('#name').val('');
        $('#species').val('');
        $('#info').val('');
        //$('#address').val('')

         
          //Delete function
          $('.delete-btn').on('click', (e) =>{
            let delId = e.target.id.split('del-').join('');
            //alert(id);

            $.ajax({
                url:`http://localhost:3000/Animal/${delId}`,
                method: 'delete'
            }).done((e) =>{
                $(`#tr-${delId}`).fadeOut(500);
            })
        })
        
    })
})

function newDisplay(objAni){

    localStorage.setItem("animal",JSON.stringify(objAni));

    window.location.href = "http://localhost:3000/display.html"
    //alert(myStore);
}