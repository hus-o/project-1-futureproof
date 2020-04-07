document.addEventListener("DOMContentLoaded", function(){
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
            /* console.log(parsedGIPHYData) */
        })
    }
    $(".selectable").selectable({
        selected: function( event, ui ){
            const urlOfSelected = ui.selected.src;
            console.log(urlOfSelected)
            $("#selectedGif").val(urlOfSelected)
        }
      });

})