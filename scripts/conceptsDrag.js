
    let activeElement = null;
    let isDragging = false;
    let offsetX = 0;
    let offsetY= 0;
    let maxPosX = 0;
    const minPosX = 0;
    let maxPosY = 0;
    const minPosY = 0;
    let dragAreaRect = null;

    for(let i = 1; i < 11; i++){
        makeConceptDragable(document.getElementById(`concept${i}`));
    }

    function makeConceptDragable(element){
        document.getElementById(element.id + "DragActivationArea").onmousedown = (e) => {
            startConceptDrag(element, e);
        };
    }

    function startConceptDrag(element, e){
        e.preventDefault();
        isDragging = true;
        activeElement = element;
        selectConcept(element);
        const conceptRect = activeElement.getBoundingClientRect();
        dragAreaRect = document.getElementById("conceptDragArea").getBoundingClientRect();

        offsetX = e.clientX - conceptRect.left; //afstanden mellem musen og venstre side af activationArea
        offsetY = e.clientY - conceptRect.top; //afstanden mellem musen og toppen af activationArea

        //these positions are local (relavtive to dragArea)
        //The minium positions will always be 0
        maxPosX = dragAreaRect.width - activeElement.offsetWidth; //offsetWidth refferer til den viste bredde (målt i css pixels). dragAresRect er allerede i ccs pixels
        maxPosY = dragAreaRect.height - activeElement.offsetHeight;

        document.onmouseup = stopConceptDrag;
        document.onmousemove = conceptDrag;
    }

    function conceptDrag(e){
        if(!isDragging) { return; }
        e.preventDefault();

        //Convert mouse pos (viewport) to concept pos inside the parent (conceptDragArea)
        const x = e.clientX - dragAreaRect.left - offsetX;
        const y = e.clientY - dragAreaRect.top - offsetY;

        if(x >= maxPosX){
            activeElement.style.left = `${maxPosX}px`;
        }else if(x <= minPosX){
            activeElement.style.left = `${minPosX}px`;
        }else{
            activeElement.style.left = `${x}px`;
        }

        if(y >= maxPosY){
            activeElement.style.top = `${maxPosY}px`;
        }else if(y <= minPosY){
            activeElement.style.top = `${minPosY}px`;
        }else{
            activeElement.style.top = `${y}px`;
        }
    }

    function stopConceptDrag(){
        document.onmouseup = null;
        document.onmousemove = null;
        activeElement = null;
        isDragging = false;
    }



