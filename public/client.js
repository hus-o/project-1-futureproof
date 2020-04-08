window.addEventListener('DOMContentLoaded', (event) => {
   
     // emoji-section

     //let counter = 0;
    $('section').each(function(){
     let clickCounter = () => {
        if (typeof(Storage) !== "undefined") {
            if (localStorage.clickcount) {
              localStorage.clickcount = Number(localStorage.clickcount)+1;
            } else {
              localStorage.clickcount = 1;
            }
            document.getElementById("count").innerHTML = "Reactions: " + localStorage.clickcount;
        } else {
          document.getElementById("count").innerHTML = "Sorry, your browser does not support web storage...";
        }
     }

     $('#love').click(function() {
        $(this).addClass('selected');
        clickCounter()
        // counter++
        // $('#count').text(counter);
        $(this).css({
            'width' : $(this).width()  + 1,
            'height': $(this).width()  + 1
        });
    });

    $("#love").hover(function(){
        $(this).attr("src", "images/Growing Pink Heart Emoji.png");
        }, function(){
        $(this).attr("src", "images/Heart Eyes Emoji.png");
      })

    $('#surprised').click(function() {
       $(this).addClass('selected');
       clickCounter()
    //    counter++
    //    $('#count').text(counter);
       $(this).css({
        'width' : $(this).width()  + 1,
        'height': $(this).width()  + 1 
        });
    });

    $("#surprised").hover(function(){
        $(this).attr("src", "images/Surprised Face Emoji.png");
        }, function(){
        $(this).attr("src", "images/Hushed Face Emoji.png");
      })
    $('#cry').click(function() {
        $(this).addClass('selected');
        clickCounter()
        // counter++
        // $('#count').text(counter);
        $(this).css({
            'width' : $(this).width()  + 1,
            'height': $(this).width()  + 1
        });
    });
    
    $("#cry").hover(function(){
        $(this).attr("src", "images/Loudly Crying Face Emoji.png");
        }, function(){
        $(this).attr("src", "images/Crying Face Emoji.png");
      });
    });
    // end of emoji-section













    $("#gifSearch").click(event => {
        event.preventDefault();
        let userQuery = $("#gif").val();
        getGIF(userQuery)
        console.log(userQuery)
    })

    function getGIF(userQuery){
        const key = "6X4aryqB9MRq0HmQ80Eh3GBw22RcLCx6";
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${userQuery}&limit=5&offset=0&rating=G&lang=en`)
        .then(data => {
            const parsedGIPHYData = JSON.parse(data.request.responseText)
            for (let i=0; i < 5; i++){
                console.log(parsedGIPHYData.data[i].images.fixed_height_small.url)
                $(`#gif${i+1}`).prop("src", parsedGIPHYData.data[i].images.fixed_height_small.url)
            }
        })
    }
  
    $(".selectable").selectable({
        selected: function( event, ui ){
            const urlOfSelected = ui.selected.src;
            console.log(urlOfSelected)
            $("#selectedGif").val(urlOfSelected)
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
    
    var idInputs=document.getElementsByName("ID")
    setToHidden([idInputs])


function addIdToButton(nodeLists){
    var list = document.getElementsByClassName("toggleComments");
    let i=0;
    for (let item of list) {
        let att = document.createAttribute("id");   
        att.value = i++
        item.setAttributeNode(att)
    }
}

  addIdToButton([document.getElementsByClassName("toggleComments")])


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
    
   



})