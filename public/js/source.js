
if(localStorage.hasOwnProperty('person') && localStorage.getItem('person') !== null){

    $(document).ready(function(){
        

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
                                <img src='images/${e[i].pix}' alt='${e[i].name}' style='width:8em; height:6em'>
                            </td>
                            <td>
                                ${e[i].name} 
                            </td>
                            <td>
                                ${e[i].species} 
                            </td>
                            <td>
                                ${e[i].info.slice(0,200)}<span>...</span><br><button id="view-${e[i].id}" class='btn btn-outline-info view-btn'>View More</button>
                            </td>
                            <td>
                                <button id="del-${e[i].id}" class="btn btn-danger delete-btn"><i class="far fa-trash-alt"></i></button>
                                <button id="edit-${e[i].id}" class="btn btn-primary edit-btn"><i class="far fa-edit"></i> Edit</button>
                            </td>
                                
                        </tr>`
        
                            )
        
                            count++;
        
                        }
        
                        //Delete function
                        $('.delete-btn').on('click', (e) =>{
                            let delId = e.target.id.split('del-').join('');
                             
                             $.ajax({
                                url:`http://localhost:3000/Animal/${delId}`,
                                 method: 'delete'
                             }).done((e) =>{
                                 $(`#tr-${delId}`).fadeOut(500);
                             })
                        })

                        //This is the edit button function
                        $('.edit-btn').on('click', (e) =>{
                            let aniId = e.target.id.split('edit-').join('');

                            $.ajax({
                                url: `http://localhost:3000/Animal/${aniId}`,
                                method: 'get'
                            }).done((e) =>{
                                localStorage.setItem('animal', JSON.stringify(e));
                                
                                window.location.href = 'http://localhost:3000/display.html'
                            })
                        })

                        //This is the view more button function
                        $('.view-btn').on('click', (e) =>{
                            let viewId = e.target.id.split('view-').join('');
                            
                            $.ajax({
                                url: `http://localhost:3000/Animal/${viewId}`,
                                method: 'get'
                            }).done((e) =>{
                                localStorage.setItem('animal', JSON.stringify(e));
                                window.location.href = 'http://localhost:3000/display.html'
                            })
                        })
        
        })
        
        //Post command start from here
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
            if(pic.includes(picName)){
                pix = picName + ".jpg";
            }
            else{pix = "sliderImg.jpg";}

            //alert(pix);
            
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
                ${e.info.slice(0,200)}...<br><button class="btn btn-outline-info view-btn" id="view-${e.id}">View More</button>
                </td>
                <td>
                <button id="del-${e.id}" class="btn btn-danger delete-btn"><i class="far fa-trash-alt"></i></button>
                <button id="edit-${e.id}" class="btn btn-primary edit-btn"><i class="far fa-edit"></i> Edit</button>
                
                </td>
                </tr>`
                )
                
                $('#name').val('');
                $('#species').val('');
                $('#info').val('');
        
                $('#zooModal').modal('hide');
        
                
                //Delete function
                $('.delete-btn').on('click', (e) =>{
                    let delId = e.target.id.split('del-').join('');
        
                    $.ajax({
                        url:`http://localhost:3000/Animal/${delId}`,
                        method: 'delete'
                    }).done((e) =>{
                        $(`#tr-${delId}`).fadeOut(500);
                    })
                })

                //This is the edit button function
                $('.edit-btn').on('click', (e) =>{
                    let aniId = e.target.id.split('edit-').join('');

                    $.ajax({
                        url: `http://localhost:3000/Animal/${aniId}`,
                        method: 'get'
                    }).done((e) =>{
                        localStorage.setItem('animal', JSON.stringify(e));
                        window.location.href = 'http://localhost:3000/display.html'
                    })
                })

                //This is the view more button function
                $('.view-btn').on('click', (e) =>{
                    let viewId = e.target.id.split('view-').join('');
                    
                    $.ajax({
                        url: `http://localhost:3000/Animal/${viewId}`,
                        method: 'get'
                    }).done((e) =>{
                        localStorage.setItem('animal', JSON.stringify(e));
                        window.location.href = 'http://localhost:3000/display.html'
                    })
                }) 
                
            })
        })

    })

}
else{window.location.href = 'http://localhost:3000'}

