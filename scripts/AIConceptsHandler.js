    // --- Create empthy concepts objects --- //  
    
    function Concept(div){
        this.div = div;
        this.number = parseInt(`${div.id.substring(7)}`); //7 is the index where the number starts
        this.title = "";
        this.text = "";
        this.titleHTML = div.querySelector("h2");
        this.textHTML = div.querySelector("p");
        this.dragActivationArea = div.querySelector(`#${div.id}DragActivationArea`);
        this.isActive = false; 

        this.isOriginalConcept = true;
        this.childConcepts = []; //This is where childen of the concepts go
        this.parentConcept = null;

        //Parameters for the AI answers - these are the default values  
        this.length = 30; 
        this.classified = false; 
        this.complexity = 50;
        this.audience = "University Student";
        this.elucidation = true;
        this.form = "text";

        this.updateConcept = function updateConcept(newTitle, newText){
            this.title = newTitle;
            this.text =  newText;
            if(this.isOriginalConcept){
                this.titleHTML.innerHTML = this.number + ": " + newTitle;
            }else{
                this.titleHTML.innerHTML = "(" + this.parentConcept.number + "): " + newTitle; //inserts the concept number in ( ), so child concepts are visually different
            }
            
            this.textHTML.innerHTML = newText;
            //Change dragActivationArea to match the height of the title. Need to wait until browser has rendered the change
            requestAnimationFrame(() => {
                // If the concept is hidden, temporarily show it to measure height
                if (!this.isActive) this.div.style.display = "inline";

                const titleHeight = this.titleHTML.getBoundingClientRect().height + 25; //+25 to acount for padding and so on
                this.dragActivationArea.style.height = `${titleHeight}px`;

                if (!this.isActive) this.div.style.display = "none";
            });
        }

        this.toggleActivation = function toggleActivation(button){
            if(this.isActive){
                this.isActive = false;
                div.style.display = "none";
                button.style.backgroundColor = "rgb(211, 211, 211)";
                deselectConcept(); //Sets the selectedConcept to null
                //Deactivates all children if this is original concept
                if(this.isOriginalConcept){
                    this.childConcepts.forEach((childConcept) => {
                        childConcept.isActive = false;
                        childConcept.div.style.display = "none";
                    });
                }
            }else{
                this.isActive = true;
                div.style.display = "inline";
                button.style.backgroundColor = "rgb(242, 242, 242)";
                selectConcept(this.div);
                //Activates all childen if this is original concept
                if(this.isOriginalConcept){
                    this.childConcepts.forEach((childConcept) => {
                        childConcept.isActive = true;
                        childConcept.div.style.display = "inline";
                    });
                }
            }
        }
    }

    let concept1 = new Concept(document.getElementById("concept1"));
    let concept2 = new Concept(document.getElementById("concept2"));
    let concept3 = new Concept(document.getElementById("concept3"));
    let concept4 = new Concept(document.getElementById("concept4"));
    let concept5 = new Concept(document.getElementById("concept5"));
    let concept6 = new Concept(document.getElementById("concept6"));
    let concept7 = new Concept(document.getElementById("concept7"));
    let concept8 = new Concept(document.getElementById("concept8"));
    let concept9 = new Concept(document.getElementById("concept9"));
    let concept10 = new Concept(document.getElementById("concept10"));
    const concepts = [];
    concepts.push(concept1, concept2, concept3, concept4, concept5, concept6, concept7, concept8, concept9, concept10);

    //converts the concept div to the Concept object. 
    function getObject(concept){
        const objectNumber = parseInt(`${concept.id.substring(7)}`);
        const objectIndex = objectNumber - 1;
        return concepts[objectIndex]; //Concept object
    }

    // --- Concepts Activation Buttons --- //
    
    //get refferences to the buttons and add eventListeners
    const button1 = document.getElementById("concept1ActivationButton");
    const button2 = document.getElementById("concept2ActivationButton");
    const button3 = document.getElementById("concept3ActivationButton");
    const button4 = document.getElementById("concept4ActivationButton");
    const button5 = document.getElementById("concept5ActivationButton");
    const button6 = document.getElementById("concept6ActivationButton");
    const button7 = document.getElementById("concept7ActivationButton");
    const button8 = document.getElementById("concept8ActivationButton");
    const button9 = document.getElementById("concept9ActivationButton");
    const button10 = document.getElementById("concept10ActivationButton");
    const buttons = [];
    buttons.push(button1, button2, button3, button4, button5, button6, button7, button8, button9, button10);
    
    buttons.forEach((button, i) => {
        button.addEventListener("click", () => {
            concepts[i].toggleActivation(button);
        });
    });

    addExplanationButtons = document.querySelectorAll(".addAnotherExplainationBtn");

    addExplanationButtons.forEach((button, i) => {
        button.addEventListener("click", () => addAnotherExplaination(concepts[i]));
    });


    async function addAnotherExplaination(parentConcept){
        // --- Creates a new concept in the DOM with correct id, but no text--- //
        const numForConceptId = concepts[concepts.length - 1].number +1; //plus 1 to get a number not yet used 
        let newId = "concept" + numForConceptId;

        // wrapper for the child concept
        const childConcept = document.createElement("div");
        childConcept.className = "concept";
        childConcept.id = newId;

        // drag activation area
        const dragActivation = document.createElement("div");
        dragActivation.id = newId + "DragActivationArea";

        // title
        const titleEl = document.createElement("h2");
        titleEl.className = "conceptTitle";
        titleEl.textContent = "New Explaintion";

        // text
        const textEl = document.createElement("p");
        textEl.className = "conceptText";
        textEl.textContent = "Thinking...";

        // assemble
        childConcept.appendChild(dragActivation);
        childConcept.appendChild(titleEl);
        childConcept.appendChild(textEl);
        document.getElementById("conceptDragArea").appendChild(childConcept);

        let newConcept = new Concept(childConcept);
        concepts.push(newConcept);
        parentConcept.childConcepts.push(newConcept); //Add the new concept to the original concepts list of childConcepts
        
        //Add the values and explaination from parent to the child concept. This makes the child a copy
        newConcept.isOriginalConcept = false;
        newConcept.parentConcept = parentConcept; //make a refference to the parent, to make write the correct title --> (parentNumber): "title"
        console.log("parentConcept = " + parentConcept);
        newConcept.title = parentConcept.title;
        newConcept.text = parentConcept.text;
        newConcept.length = parentConcept.length; 
        newConcept.classified = parentConcept.classified; 
        newConcept.complexity = parentConcept.complexity;
        newConcept.audience = parentConcept.audience;
        newConcept.elucidation = parentConcept.elucidation;
        newConcept.form = parentConcept.form;

        childConcept.style.display = "block";
        childConcept.style.position = "absolute";
        makeConceptDragable(childConcept);
        selectConcept(childConcept);

        // --- Generate a new explaination of the concept and insert it into the child concept  --- //
        createNewExplanationPromptAndAddToMessages(newConcept);
        let answerFromAI = await(mind.chat(messages));
        messages.push({role: "assistant", content: answerFromAI});

        //Make sure the answer is only JSON
        let startPosition = answerFromAI.search(/\[/); //When the JSON begins
        let endPosition = answerFromAI.search(/\]/); //When the JSON ends
        answerFromAI = answerFromAI.substring(startPosition, endPosition + 1); // +1 since end is exclusive
        try {
            answerFromAI = JSON.parse(answerFromAI);
        } catch{
            console.log("Not JSON format. Here is the answer: " + answerFromAI);
        }
        newConcept.updateConcept(answerFromAI[0].title, answerFromAI[0].text)

        newConcept.toggleActivation(buttons[parentConcept.number - 1]); // make the new concept active, so the user can see it immediately
    }

    // --- Handle AI --- //

    const mind = new WarpMind({"baseURL": "https://warp.cs.au.dk/mind"});
    let messages = [];

    const initialSystemPrompt = `
    You are WarpMind. You extract exactly 10 clear, distinct concepts from the given text';
    Each concept must have:
    - A short title (2-5 words)
    - A short explanation (25-35 words), where the complexity level must be around 50 out of 100, where 100 is the most complex. Write as if you are writing to a University Student.
    Return ONLY valid JSON.
    Do NOT include any explanations or extra text.
    The JSON must be an array of objects, for example:

    [
        { "title": "Concept 1", "text": "Description here..."},
        { "title": "Concept 2", "text": "Description here..."}
    ]
    
    Here is the text:
    `;
    messages.push({role: 'user', content: initialSystemPrompt});

    function updateConceptPromptAndAddToMessages(concept){
        let newMessage = `Please rewrite text (and title if you find it nessecary) of ONLY concept number ${concept.number} with these new criteria:
        - The title must still be 2-5 words
        - The text must be ${concept.length - 5}-${concept.length + 5} words
        - The complexity level of the text must be ${concept.complexity} out of 100, where 100 is the most complex
        - Write as if you are writing to a ${concept.audience}.
        ${concept.classified? "- Pretend that this concept is classified. Please black out important words in the concept text, so they cant be read." : ""}
        ${concept.elucidation? "" : "Write the text in riddles. Please sound mysterious"}
        ${(concept.form==="text")? "" : "Write the text in bullet points, please"}

        Return ONLY valid JSON.
        Do NOT include any explanations or extra text.
        The JSON must be in an array of objects (even though is should be only one object), for example:

        [
            { "title": "Concept 1", "text": "Description here..."}
        ]
        `
        messages.push({role: "user", content: newMessage});
    }

    function createNewExplanationPromptAndAddToMessages(concept){
        let newMessage = `Please rewrite text and title of ONLY concept number ${concept.number} so you explain it in a different way. The criteria is still the same:
        - The title must be 2-5 words
        - The text must be ${concept.length - 5}-${concept.length + 5} words
        - The complexity level of the text must be ${concept.complexity} out of 100, where 100 is the most complex
        - Write as if you are writing to a ${concept.audience}.
        ${concept.classified? "- Pretend that this concept is classified. Please black out important words in the concept text, so they cant be read." : ""}
        ${concept.elucidation? "" : "Write the text in riddles. Please sound mysterious"}
        ${(concept.form==="text")? "" : "Write the text in bullet points, please"}

        Return ONLY valid JSON.
        Do NOT include any explanations or extra text.
        The JSON must be in an array of objects (even though is should be only one object), for example:

        [
            { "title": "Concept 1", "text": "Description here..."}
        ]
        `
        messages.push({role: "user", content: newMessage});
    }

    let fullPDFText = "";
    getFullTextFromPDFAndInstantiateConcepts("../Assets/instrumental_interaction.pdf");

    // --- Test answers --- //
    testAnswers = `[
    { "title": "Instrumental Interaction Model", "text": "A new interaction model that extends direct manipulation, covering traditional and novel interaction styles, creating a design space for new techniques."},
    { "title": "WIMP Interfaces", "text": "Stands for Windows, Icons, Menus, and Pointing; revolutionized computing by making it accessible to a broader audience but now facing limitations."},
    { "title": "Post-WIMP Interfaces", "text": "New graphical interfaces leveraging novel interaction techniques; require new models and tools for integration and development."},
    { "title": "Domain Objects and Instruments", "text": "In the Instrumental Interaction model, users interact with domain objects through instruments, similar to real-world tools."},
    { "title": "Properties of Interaction Instruments", "text": "Defined by degree of indirection, integration, and compatibility, these properties help in evaluating and comparing interaction designs."},
    { "title": "Interaction Model vs. Architectural Model", "text": "Interaction models guide interface design principles, while architectural models define functional elements and relationships in interface implementation."},
    { "title": "Direct Manipulation Principles", "text": "Involves continuous representation of objects, physical actions on objects, fast and incremental operations, and a layered learning approach."},
    { "title": "Design Space and Exploration", "text": "Instrumental Interaction opens a design space for identifying unexplored areas and creating new interaction techniques."},
    { "title": "Reification in User Interfaces", "text": "Turning concepts into objects, allowing them to be represented and manipulated on-screen, thus creating domain objects and instruments."},
    { "title": "Search and Replace Instrument", "text": "A novel tool for text editors allowing non-modal, global feedback search and replace operations with a focus on user control and immediate feedback."}
    ]`

    //add the test answers to the concept objects
    // testAnswers = JSON.parse(testAnswers);
    // concepts.forEach((concept, i) => {
    //     concept.updateConcept(testAnswers[i].title, testAnswers[i].text);
    // });
    
    //Activate concept 1 for testing
    function setConcept1ActiveForInitialization(){
        concept1.toggleActivation(button1);
    }

    // --- Real answers --- //
    async function getFullTextFromPDFAndInstantiateConcepts(url) {
        const pdf = await pdfjsLib.getDocument(url).promise;
        let fullText = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            fullText += "\n" + await extractPageText(page) + "\n\n";
        }
        fullPDFText = fullText.trim();
        instantiateInitialConcepts(); //Call it here to make sure the text has been extracted before giving it to the AI
    }

    async function extractPageText(page){
        const content = await page.getTextContent();
        const items = content.items; //Gets all the words (/small parts) in a list
        let text = "";
        let previousY = null;

        for (const item of items){
            const [ , , , , x, y ] = item.transform; //The first 4 parameters of the item is irelevent. Only x and y positions are used

            //If y changes a lot, a new line has started. 
            if (previousY !== null && Math.abs(y - previousY) > 10) {
                previousY += "\n"; // add a line break
            }

            text += item.str + " ";
            previousY = y;
        }
        return text.trim();
    }

    // --- Fill the concepts with AI answers --- //

    async function instantiateInitialConcepts(){
        console.log("Thinking :)");
        let answerFromAI = await(mind.chat(initialSystemPrompt + "\n\n" + fullPDFText)); //the two n's are to make an "enter"
        messages.push({role: "assistant", content: answerFromAI});

        //Make sure the answer is only JSON
        let startPosition = answerFromAI.search(/\[/); //When the JSON begins
        let endPosition = answerFromAI.search(/\]/); //When the JSON ends
        answerFromAI = answerFromAI.substring(startPosition, endPosition + 1); // +1 since end is exclusive

        let conceptsJSON = [];
        try {
            conceptsJSON = JSON.parse(answerFromAI);
        } catch{
            console.log("Not JSON format. Here is the answer: " + answerFromAI);
        }

        //add the answers to the concept objects
        concepts.forEach((concept, i) => {
            concept.updateConcept(conceptsJSON[i].title, conceptsJSON[i].text);
        });
        console.log("Done thinking :)");
    }

    // --- Update a concept with AI answers --- //

    async function getNewConceptTextAfterUpdate(concept){
        updateConceptPromptAndAddToMessages(concept); 
        let answerFromAI = await(mind.chat(messages));
        messages.push({role: "assistant", content: answerFromAI});

        //Make sure the answer is only JSON
        let startPosition = answerFromAI.search(/\[/); //When the JSON begins
        let endPosition = answerFromAI.search(/\]/); //When the JSON ends
        answerFromAI = answerFromAI.substring(startPosition, endPosition + 1); // +1 since end is exclusive
        try {
            answerFromAI = JSON.parse(answerFromAI);
        } catch{
            console.log("Not JSON format. Here is the answer: " + answerFromAI);
        }
        return answerFromAI;
    }

    // --- Updates the Control Panel with the parameters of the selected concept --- //
    
    function updatePanel(){
        console.log("Opdaterer panelet");
        const selectedConcept = getObject(getSelectedConcept());

        lengthOfTextDisplayParagraph.innerHTML = selectedConcept.length;
        
        if(selectedConcept.classified){
            classifiedRadioButton.checked = true;
        }else{
            unclassifiedRadioButton.checked = true;
        }

        complexitySlider.value = selectedConcept.complexity;

        switch(selectedConcept.audience){
            case "5 Year Old Child": 
                audience5YearOld.checked = true;
                break;
            case "Random person from the street": 
                audienceRandom.checked = true;
                break;
            case "University Student": 
                audienceStudent.checked = true;
                break;
            case "Scientist with a PHD in the field of this paper": 
                audiencePHD.checked = true;
                break;
            default: 
            console.log("Audience value does not match options. The value was: " + selectedConcept.audience);
        }

        if(selectedConcept.elucidation){
            elucidationOnDiv.style.backgroundColor = "rgba(242, 242, 242, 1)";
            elucidationOffDiv.style.backgroundColor = "rgb(224, 224, 224)";
        }else{
            elucidationOnDiv.style.backgroundColor = "rgb(224, 224, 224)";
            elucidationOffDiv.style.backgroundColor = "rgb(242, 242, 242)";
        }

        if(selectedConcept.form === "text"){
            formTextDiv.style.backgroundColor = "rgba(242, 242, 242, 1)";
            formBulletDiv.style.backgroundColor = "rgb(224, 224, 224)";
        }else{
            formTextDiv.style.backgroundColor = "rgb(224, 224, 224)";
            formBulletDiv.style.backgroundColor = "rgb(242, 242, 242)";
        }
    }

    // --- Control Panel : Numpad --- //

    let lengthOfText = 30; //default value is 30 words (+- 5 words)
    const lengthOfTextDisplayParagraph = document.getElementById("lengthOfTextDisplay").querySelector("p");
    let isChangingLengthOfText = false;

    //Add eventListeners to the buttons
    const numpadBtn1 = document.getElementById("numpadButton1");
    const numpadBtn2 = document.getElementById("numpadButton2");
    const numpadBtn3 = document.getElementById("numpadButton3");
    const numpadBtn4 = document.getElementById("numpadButton4");
    const numpadBtn5 = document.getElementById("numpadButton5");
    const numpadBtn6 = document.getElementById("numpadButton6");
    const numpadBtn7 = document.getElementById("numpadButton7");
    const numpadBtn8 = document.getElementById("numpadButton8");
    const numpadBtn9 = document.getElementById("numpadButton9");
    const numpadBtnBack = document.getElementById("numpadButtonBack");
    const numpadBtn0 = document.getElementById("numpadButton0");
    const numpadBtnConfirm = document.getElementById("numpadButtonConfirm");

    let numpadButtons = [];
    numpadButtons.push(numpadBtn1, numpadBtn2, numpadBtn3, numpadBtn4, numpadBtn5, numpadBtn6, numpadBtn7, numpadBtn8, numpadBtn9, numpadBtnBack, numpadBtn0, numpadBtnConfirm);

    numpadButtons.forEach((button, i) => {
        if(button.id.length === 13){ //the buttons with numbers
            button.addEventListener("click", () => {
                addNumberToDisplay(button);
            });
        }
    });

    numpadBtnBack.addEventListener("click", () => {
        removeNumberFromDisplay();
    });

    numpadBtnConfirm.addEventListener("click", () => {
        confirmLengthOfText();
    });

    function addNumberToDisplay(button){
        if(!isChangingLengthOfText){
            lengthOfTextDisplayParagraph.innerHTML = ""; //resets lenght of text, when the user start to enter a new length of text
            isChangingLengthOfText = true;
        }
        lengthOfTextDisplayParagraph.innerHTML += button.innerHTML;
    }

    function removeNumberFromDisplay(){
        let text = lengthOfTextDisplayParagraph.innerHTML;
        text = text.substring(0, text.length-1); //Text without the last char
        lengthOfTextDisplayParagraph.innerHTML = text;
    }

    async function confirmLengthOfText(){
        isChangingLengthOfText = false;
        lengthOfText = parseInt(lengthOfTextDisplayParagraph.innerHTML);
        const selectedConcept = getObject(getSelectedConcept());

        //Gets a new answer from the AI with the new parameter. Then updates the concept
        selectedConcept.length = lengthOfText;
        const conceptJSON = await getNewConceptTextAfterUpdate(selectedConcept);

        selectedConcept.updateConcept(conceptJSON[0].title, conceptJSON[0].text); // [0] --> the first and only object
    }

    // --- Control Panel : Classification --- //

    const classifiedRadioButton = document.getElementById("RedactionRadioClassified");
    const unclassifiedRadioButton = document.getElementById("RedactionRadioUnclassified");

    async function setToClassified(bool){
        const concept = getObject(getSelectedConcept());
        concept.classified = bool;
        answerJSON = await getNewConceptTextAfterUpdate(concept);
        concept.updateConcept(answerJSON[0].title, answerJSON[0].text);
    }

    // --- Control Panel : Complexity --- //
    const complexitySlider = document.getElementById("complexitySlider");
    complexitySlider.addEventListener("change", updateComplexity);

    async function updateComplexity(){
        const concept = getObject(getSelectedConcept());
        concept.complexity = complexitySlider.value;
        answerJSON = await getNewConceptTextAfterUpdate(concept);
        concept.updateConcept(answerJSON[0].title, answerJSON[0].text);
    }

    // --- Control Panel : Audience --- //
    const audience5YearOld = document.getElementById("Audience5YearOld");
    const audienceRandom = document.getElementById("RandomStreetPerson");
    const audienceStudent = document.getElementById("AudienceUniversityStudent");
    const audiencePHD = document.getElementById("ScientistPHD");

    document.querySelectorAll(".audienceRadioBtn").forEach(radioBtn => {
        radioBtn.addEventListener("click", () => updateAudience(radioBtn.value));
    })

    async function updateAudience(value){
        const concept = getObject(getSelectedConcept());
        concept.audience = value;
        answerJSON = await getNewConceptTextAfterUpdate(concept);
        concept.updateConcept(answerJSON[0].title, answerJSON[0].text);
    }

    // --- Control Panel : Elucidation --- //
    const elucidationOnDiv = document.getElementById("elucidationON");
    const elucidationOffDiv = document.getElementById("elucidationOFF");

    elucidationOnDiv.addEventListener("click", () => updateElucidation(true));
    elucidationOffDiv.addEventListener("click", () => updateElucidation(false));

    async function updateElucidation(bool){
        const concept = getObject(getSelectedConcept());
        if(concept.elucidation === bool){ //user presses the already activated button. Nothing happens then
            return;
        }

        if(bool){
            elucidationOnDiv.style.backgroundColor = "rgba(242, 242, 242, 1)";
            elucidationOffDiv.style.backgroundColor = "rgb(224, 224, 224)";
        }else{
            elucidationOnDiv.style.backgroundColor = "rgb(224, 224, 224)";
            elucidationOffDiv.style.backgroundColor = "rgb(242, 242, 242)";
        }

        concept.elucidation = bool;
        answerJSON = await getNewConceptTextAfterUpdate(concept);
        concept.updateConcept(answerJSON[0].title, answerJSON[0].text);
    }

    // --- Control Panel : Form --- //
    const formTextDiv = document.getElementById("formText");
    const formBulletDiv = document.getElementById("formBullet");

    formTextDiv.addEventListener("click", () => updateForm("text"));
    formBulletDiv.addEventListener("click", () => updateForm("bullet"));

    async function updateForm(form){
        const concept = getObject(getSelectedConcept());
        if(concept.form === form){ //user presses the already activated button. Nothing happens then
            return;
        }

        if(form === "text"){
            formTextDiv.style.backgroundColor = "rgba(242, 242, 242, 1)";
            formBulletDiv.style.backgroundColor = "rgb(224, 224, 224)";
        }else{
            formTextDiv.style.backgroundColor = "rgb(224, 224, 224)";
            formBulletDiv.style.backgroundColor = "rgb(242, 242, 242)";
        }

        concept.form = form;
        answerJSON = await getNewConceptTextAfterUpdate(concept);
        concept.updateConcept(answerJSON[0].title, answerJSON[0].text);
    }


