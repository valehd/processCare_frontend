# ProcessCare Frontend

## Overview

**ProcessCare** is a TypeScript frontend application developed to support the management of neonatal healthcare processes in a Neonatal Intensive Care Unit (NICU).

The application allows healthcare staff to register newborns, display patient information, assign clinical procedures, and update the status of each healthcare process through an intuitive and type-safe interface.

This project was developed for **Hito 2**, focusing on **TypeScript best practices**, **secure DOM manipulation**, and **asynchronous programming**.

---

# Features

* Register a newborn using a validated form.
* Display complete newborn information.
* Manage parent or guardian contact information.
* View available healthcare processes.
* Assign healthcare processes to the newborn.
* Complete or cancel assigned processes.
* Display loading and error states during data retrieval.

---

# Technologies

* TypeScript
* HTML5
* CSS3
* Vite

---

# Project Structure

```text
processcare-frontend/
│
├── public/
│   └── logo.png
│
├── src/
│   ├── assets/
│   │   └── styles.css
│   │
│   ├── components/
│   │   ├── NewbornForm.ts
│   │   └── ProcessCard.ts
│   │
│   ├── data/
│   │   ├── newborn.json
│   │   ├── healthcareProcesses.json
│   │   └── assignedProcesses.json
│   │
│   ├── models/
│   │   ├── index.ts
│   │   └── process.ts
│   │
│   ├── services/
│   │   └── processService.ts
│   │
│   └── main.ts
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# Hito 2 Requirements

## 1. Data Modeling with TypeScript

The application models all business entities using **strict TypeScript interfaces** and **enumerations**, ensuring strong typing throughout the project.

### Interfaces

* Newborn
* Contact
* HealthcareProcess
* AssignedProcess

### Enumerations

* ProcessStatus
* Gender
* Relationship

### Benefits

* No use of `any`
* Compile-time type checking
* Strongly typed business entities
* Improved maintainability

---

## 2. Secure DOM Manipulation and Form Handling

The application safely interacts with the DOM using TypeScript type guards.

### DOM Safety

* HTMLFormElement validation
* HTMLInputElement validation
* HTMLSelectElement validation
* HTMLParagraphElement validation

### Form Handling

The newborn registration form includes:

* `preventDefault()` to prevent page reloads
* Safe extraction of form values
* Typed DOM access
* Client-side validation
* User-friendly error messages

### Implemented Validations

* Positive newborn ID
* Name is required
* Name cannot contain only numbers
* Birth date is required
* Weight must be between 0.5 and 8 kg
* Gestational age must be between 22 and 45 weeks
* Contact name is required
* Email format validation
* Phone number validation

---

## 3. Asynchronous Architecture

Application data is loaded asynchronously to simulate communication with external services.

### Techniques Used

* async / await
* Promise.all()
* try / catch

### Resources Loaded

* newborn.json
* healthcareProcesses.json
* assignedProcesses.json

### User Experience

The application displays:

* Loading state while retrieving data
* Error message if loading fails
* Automatically rendered interface after successful loading

---

# Application Workflow

1. Application starts.
2. Initial data is loaded asynchronously.
3. Newborn information is displayed.
4. Available healthcare processes are shown.
5. Users can assign, complete, or cancel healthcare processes.
6. A validated form allows registration of a newborn.

---

# Learning Outcomes

This project demonstrates practical application of:

* TypeScript Interfaces
* TypeScript Enums
* Strict Typing
* DOM Type Guards
* Event Handling
* Form Validation
* Async/Await
* Promise.all()
* Error Handling with try/catch
* Modular Application Design
* Separation of Concerns

---

# How to Run

Clone the repository:

```bash
git clone https://github.com/valehd/processcare-frontend.git
```

Navigate to the project folder:

```bash
cd processcare-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

---

# Repository

GitHub Repository:

https://github.com/valehd/processcare-frontend

---

# Author

**Valentina Hernández**

2026
