# warpmind-ai-concept-extractor
Experimental HCI web-based prototype exploring interactive manipulation of AI-generated concepts and dynamic UI manipulation (HTML, CSS, JavaScript). This project was primarily focused on exploring interaction design and as an introduction to JavaScript, rather than building a production-ready system.

Developed by me as part of the Human-Computer Interaction course (3rd semester) at Aarhus University.

The system allows users to:
- Upload and read a PDF
- Extract key concepts from the document using an AI API
- Visually organize and manipulate concepts as movable elements
- Adjust how concepts are presented (length, complexity, audience, format, etc.)

The interface is designed as an interactive workspace inspired by a “lab environment,” where users can experiment with the different concepts.

<img width="1500" height="366" alt="Comparison" src="https://github.com/user-attachments/assets/b6c02476-10b2-4331-a683-1fe25298bdb4" />

# Features
**AI-generated concepts**
- Generates 10 key concepts from a pdf using a provided API
- Each concept includes a title and explanation

**Concept manipulation**
- Concepts can be moced within a defined area
- The selected concept is highlighted and brought to the front
- Concepts can be toggled on/off to control what is visible
- It is possible to create alternative explanations of a concept (“child concepts”)
- Explainations of concept can be adjusted by:
  - Length
  - Complexity
  - Target audience
  - Format (text / bullet points)
  - Style (e.g. “classified” or abstract/riddle-like)

**Workspace interaction**
- Movable “folder” UI for both PDF and concepts
- The layout allows the user to arrange their workspace


# Tech Stack
HTML, CSS, JavaScript (no frameworks were allowed)

Custom interaction logic for UI movement and state handling

PDF rendering via pdf.js (the only library allowed)

AI integration via course-provided API

# Technical Highlights

**Concept structure**
- Each concept is represented as an object with its own state and settings
- Supports parent/child relationships to allow multiple versions of the same concept (alternative explainations)

**Dynamic UI updates**
- Concepts updates dynamically when new data is returned from the AI
- Changes to parameters (e.g. complexity or length) trigger rewrite of explaination

**AI interaction**
- Can handle asynchronous responses, so program continues while waiting for AI-response
- Prompts are structured to ensure consistent JSON output
- Output can be adjusted based on audience, tone, and level of detail

**Manual interaction handling**
- Implemented custom mouse-based movement for UI elements
- Added constraints to control positioning between elements


# Reflections
This prototype was developed as part of a university course and has some limitations:

- It uses a placeholder PDF instead of user-uploaded
- The AI API is no longer active, so concepts and some UI-elements are unresponsive
- The application is not responsive and is optimized for a fixed screen size
- Some UI elements are visually rough and could be refined to better communicate their functionality

Despite these limitations, the project gave me hands-on experience with multiple concepts and technologies:
- Building complex UI logic for concepts and folders without relying on frameworks
- Handled asynchronous data from an external API
- Dynamically changing the DOM from user interactions and API responses
- Managing state and relationships between dynamic UI elements
- Working with API-driven applications and handling unreliable or inconsistent responses
- Evaluating the prototype using methods such as cognitive walkthrough, think-aloud study and Jakob Nielsen's the 10 Usability Heuristics 

If I were to extend this project, I would:
- Refactor the codebase into a more modular architecture with clearer separation between UI, logic, and API layers to limit coupling
- Improve responsiveness and the graphical elements
- Replace the API with a modern LLM integration
- Improve state management, reduce reliance on global dependencies and generally clean up the code
- Enable user-uploaded PDFs (it's currently simulated)
- Make switches between using real AI inputs and placeholder text (for faster development) easier by using compositional design

# Screenshots
Multiple concepts can be view at the same time. Can be toggled on/off on the top right panel
<img width="1920" height="923" alt="Skærmbillede (7)" src="https://github.com/user-attachments/assets/3aaf5e67-7699-4eb3-b235-2d48d1c6247b" />

Concept explainations can be changed in on the "control panel" on the bottom right. Selecting a concept changes the control panel values.
<img width="1920" height="921" alt="Skærmbillede (9)" src="https://github.com/user-attachments/assets/a44b55bd-1e7d-4039-be25-15f1abfb318a" />
<img width="1920" height="917" alt="Skærmbillede (10)" src="https://github.com/user-attachments/assets/51ddd686-db21-432d-baef-1c16893637d1" />

Creating a different explaination of the same concept (here showing the placeholder text, visible before the AI answers)
<img width="1920" height="917" alt="Skærmbillede (13)" src="https://github.com/user-attachments/assets/722f0528-d269-4fe5-b16c-261a88c16378" />

Having both PDF and concepts visible
<img width="1920" height="922" alt="Skærmbillede (18)" src="https://github.com/user-attachments/assets/44eb84b5-b549-471c-a906-053166057ade" />

