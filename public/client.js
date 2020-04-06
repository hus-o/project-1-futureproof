document.addEventListener("DOMContentLoaded", function(){
    $("#gifSearch").click(event => {
        event.preventDefault();
        let userQuery = $("#gif").val();
        getGIF(userQuery)
        console.log(userQuery)
    })


    function getGIF(userQuery){
        const key = "6X4aryqB9MRq0HmQ80Eh3GBw22RcLCx6";
        /* let usedQuery = query.replace(" ", "&"); */
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${userQuery}&limit=25&offset=0&rating=G&lang=en`)
        .then(data => {
            /* data.request.response */
            console.log(data.request.response)
        })
    }
})