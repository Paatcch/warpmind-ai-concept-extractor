# warpmind-ai-concept-extractor
Experimental HCI web-based project exploring interactive manipulation of AI-generated concepts and dynamic UI manipulation (HTML, CSS, JavaScript)

Developed as part of the Human-Computer Interaction course (3rd semester) at Aarhus University.

# Overview

WarpMind explores how users can interact with AI-generated content in a more dynamic and hands-on way.

The system allows users to:

- Upload a PDF (simulated in the current version)
- Generate key concepts from the document using an AI API
- Visually organize and manipulate concepts as movable elements
- Adjust how concepts are presented (length, complexity, audience, format, etc.)

The interface is designed as an interactive workspace inspired by a “lab environment,” where users can experiment with different representations of information.

# Features
**AI-generated concepts**
- Extracts 10 key concepts from a pdf via API
- Each concept includes a title and explanation

**Interactive concept manipulation**
- Move concepts freely within a defined workspace
- Activate/deactivate concepts dynamically
- Create alternative explanations (“child concepts”)
- Adjust explaination of concept by:
  - Length
  - Complexity
  - Target audience
  - Format (text / bullet points)
  - Style (e.g. “classified” or abstract/riddle-like)

**Dual workspace interaction**
- Movable “folder” UI for both PDF and concepts
- Spatial interaction between interface elements


# Tech Stack
HTML, CSS, JavaScript (no frameworks were allowed)

Custom interaction logic for UI movement and state handling

PDF rendering via pdf.js (the only library allowed)

AI integration via course-provided API


#My Contribution

This was an individual project where I:

- Designed and implemented the full UI and interaction model
- Built custom logic for movable UI elements and concept interaction
- Implemented state management for concepts and their relationships
- Integrated and handled asynchronous communication with an AI API
- Designed dynamic prompts to control AI-generated output

# Technical Highlights

**Custom object model for concepts**
- Each concept maintains its own state and parameters
- Supports parent-child relationships for alternative explanations

**Dynamic UI updates**
- DOM updates based on asynchronous AI responses
- Parameter-driven regeneration of content

**Prompt engineering**
- Structured prompts to control:
  - Output format (JSON)
  - Complexity
  - Tone and audience

**Manual interaction handling**
- Implemented custom mouse-based movement for UI elements
- Constraint-based positioning between interface components


# Limitations

This project was developed as part of a learning process and has some known limitations:

- The AI API is no longer active → concepts are not generated dynamically
- PDF rendering is currently non-functional due to API dependency
- The application is not responsive and is optimized for a fixed screen size
- Code structure could be improved (e.g. separation of concerns, modularization)
- UI elements are visually crude

# What I Learned

- Designing interactive systems that combine UI, logic, and asynchronous data
- Managing state and relationships between dynamic UI elements
- Working with API-driven applications and handling unreliable responses
- Translating UX concepts into concrete technical implementations
- Building complex interactions without relying on frameworks
- Analysing and testing the UI with methods such as cognitive walkthrough, think-aloud study and the 10 Usability Heuristics by Jakob Nielsen

If I were to extend this project, I would:
- Refactor the codebase into a more modular architecture with clearer separation between UI, logic, and API layers to limit coupling
- Add responsiveness and improve the visual design
- Replace the API with a modern LLM integration
- Improve state management and reduce global dependencies
- Enable user-uploaded PDFs



