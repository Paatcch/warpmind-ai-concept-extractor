    

{
    let activeElement = null;
    let otherElement = null; //Refers to the other folder
    const pdfFolder = document.getElementById("pdfFolder");
    const conceptsFolder = document.getElementById("conceptsFolder");
    let isDragging = false;
    let offsetX = 0;
    let maxPosX = 0;
    let minPosX = 0;
    const minDistance = 120;
    
    makeElementDragable(pdfFolder);
    makeElementDragable(conceptsFolder);

    function makeElementDragable(element){
        document.getElementById(element.id + "DragActivationArea").onmousedown = (e) => {
            startDrag(element, e);
        }
    }

    function startDrag(element, e){
        e.preventDefault();
        isDragging = true;
        //Sets active folder and the other folder
        activeElement = element;
        otherElement = activeElement === pdfFolder ? conceptsFolder : pdfFolder;

        const rectActivationArea = activeElement.getBoundingClientRect();
        offsetX = e.clientX - rectActivationArea.left + 8;

        maxPosX = parseFloat(element.getAttribute("data-max"));
        minPosX = parseFloat(element.getAttribute("data-min"));

        document.onmouseup = stopDrag;
        document.onmousemove = drag;
    }

    function drag(e){
        if (!isDragging) return;
        e.preventDefault();

        // new x position for activeElement
        let x = e.clientX - offsetX;
        if (x < minPosX) x = minPosX;
        if (x > maxPosX) x = maxPosX;
        activeElement.style.left = `${x}px`;

        // check for distance between the two folders
        const pdfRect = pdfFolder.getBoundingClientRect();
        const conceptRect = conceptsFolder.getBoundingClientRect();

        // x2 is new x position for other element
        // If dragging the concepts folder
        if (activeElement === conceptsFolder) {
            const distance = Math.abs(pdfRect.right - conceptRect.left);
            if (distance < minDistance) {
            // Move the pdf folder left to maintain the distance
            const x2 = x - pdfRect.width - minDistance;
            pdfFolder.style.left = `${x2}px`;
        }}

        // If dragging the pdf folder
        else if (activeElement === pdfFolder) {
            const distance = conceptRect.left - pdfRect.right;            
            if (distance < minDistance) {
            // Move the concepts folder right to maintain the distance
            const x2 = pdfRect.right + minDistance;
            conceptsFolder.style.left = `${x2}px`;
            }
        }
    }

    function stopDrag(){
        document.onmouseup = null;
        document.onmousemove = null;
        activeElement = null;
        otherElement = null;
        isDragging = false;
    }
}    


    