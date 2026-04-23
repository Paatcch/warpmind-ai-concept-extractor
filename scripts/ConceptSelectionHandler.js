let selectedConcept = null;
let lastSelectedConcept = null;
const ZIndexForSelectedConcept = 140; //+1 for dragActivationArea
const ZIndexForNormalConcept = 100; //+1 for dragActivationArea

//Activate concept 1 when browser loads
setConcept1ActiveForInitialization();

function getSelectedConcept(){
    return selectedConcept;
}

function selectConcept(concept){
    if(concept === selectedConcept){ //the user selects the already selected element. For example by clicking/dragging the selected element
        return;
    }

    console.log("Select concept: " + concept.id);

    // make last selected concept NOT highlighted
    if(selectedConcept !== null){
        selectedConcept.style.backgroundColor = "rgb(235, 226, 163)";
        selectedConcept.style.zIndex = `${ZIndexForNormalConcept}`;
        selectedConcept.querySelector("div").style.zIndex = `${ZIndexForNormalConcept + 1}`; //DragActivationArea
    }

    //highlight the new selected concept
    concept.style.backgroundColor = "rgb(245, 238, 185)"
    concept.style.zIndex = `${ZIndexForSelectedConcept}`;
    concept.querySelector("div").style.zIndex = `${ZIndexForSelectedConcept + 1}`; //DragActivationArea

    //set the new selected concept
    selectedConcept = concept;
    console.log("Selected concept has been set to " + concept.id);

    updatePanel(selectedConcept);
}

function deselectConcept(){
    selectedConcept = null;
    console.log("Selected concept has been set to null");
}
