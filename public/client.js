window.addEventListener('DOMContentLoaded', (event) => {
    let offset = 0
    $("#gifSearch").click(event => {
        event.preventDefault();
        let userQuery = $("#gif").val();
        getGIF(userQuery, offset)
        console.log(userQuery)
    })

    $("#loadMore").click(event => {
        event.preventDefault();
        let userQuery = $("#gif").val();
        offset += 5
        console.log(offset)
        getGIF(userQuery, offset)
        console.log(userQuery)
    })

    function getGIF(userQuery,offset){
        const key = "6X4aryqB9MRq0HmQ80Eh3GBw22RcLCx6";
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${userQuery}&limit=5&offset=${offset}&rating=G&lang=en`)
        .then(data => {
            const parsedGIPHYData = JSON.parse(data.request.responseText)
            for (let i=0; i < 6; i++){
                console.log(parsedGIPHYData.data[i].images.fixed_height_small.url)
                $(`#gif${i+1}`).prop("src", parsedGIPHYData.data[i].images.fixed_height_small.url)
                $(`#gif${i+1}`).prop("alt", parsedGIPHYData.data[i].title)
            }
        })
    }
  
    $(".selectable").selectable({
        selected: function( event, ui ){
            const urlOfSelected = ui.selected.src;
            const altOfSelected = ui.selected.alt
            console.log(urlOfSelected)
            $("#selectedGifURL").val(urlOfSelected)
            $("#selectedGifALT").val(altOfSelected)
        }
      });

    function setToHidden(nodeLists){
        let ids=nodeLists[0]
        ids.forEach(element => {
            if(element.type !== "file"){
                element.hidden=true;
            };
        })
    }

    function setToRequired(nodeLists){
        let ids=nodeLists[0]
        console.log(ids)
        ids.forEach(element => {
            if(element.type !== "file"){
                element.required=true;
            };
        })
    }
    
    function addIdToButton(nodeLists){
        var list = document.getElementsByClassName("toggleComments");
        let i=0;
        for (let item of list) {
            let att = document.createAttribute("id");   
            att.value = i++
            item.setAttributeNode(att)
        }
    }

    function toggleComments(n){
        let x=$(".comments")[n];
        console.log($(x).css('display'))
        
        if($(x).css('display') === 'none') {
            $(x).css('display', "block");
        }
        else if($(x).css('display')=== "block"){
            $(x).css('display', "none");
         }
    }



    $( document ).ready(function(){
        $("button").click(function() { 
            var t = $(this).attr('id'); 

            toggleComments(t)

            if($(this).text()==="Show Comments"){
                $(this).text("Hide Comments")
            }
            else if($(this).text()==="Hide Comments"){
                $(this).text("Show Comments")
            }
        
        });  

        $("#gifSearch").click(event => {
            event.preventDefault();
            let userQuery = $("#gif").val();
            getGIF(userQuery)
            console.log(userQuery)
        })

        $(".selectable").selectable({
            selected: function( event, ui ){
                const urlOfSelected = ui.selected.src;
                console.log(urlOfSelected)
                $("#selectedGif").val(urlOfSelected)
            }
        });
    })

    setToRequired([document.getElementsByName("comment")])
    addIdToButton([document.getElementsByClassName("toggleComments")])
    
    document.getElementById("addComment").addEventListener('submit', function(event){
        event.preventDefault()

        var id= document.getElementById("ID").value     
        let comment =document.getElementById("comment").value
    }); 

        axios({
                method: 'POST',
                url: '/addComment',
                data: {
                    'ID': id,
                    'comment':comment
                }
        }).
        then(response=>{

            console.log("after post")
            console.log("res=",response)

            axios({
                method: 'POST',
                url: '/comments',
                data: {
                    'ID': id,
                }
            })
            .then(response=>{
                console.log("curr id", id)
                console.log("res2" ,response)

                $(`input[value=${id}]`).parentsUntil("section").find(".comments").append(`<p class=comment>${response.data}</p>`)
            })
        
        })
       
        
        
        })


})
    
