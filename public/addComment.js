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



