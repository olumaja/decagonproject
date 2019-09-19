
$(document).ready(function(){
    let data = localStorage.getItem('animal');

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
                    <button class="btn btn-primary data-toggle="modal" data-target="#zooModal""><i class="fas fa-edit"></i> Edit</button>
                </td>
            </tr>`
    
        )    

})

