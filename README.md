# ProcessCare Frontend

## Neonatal Healthcare Process Management System

ProcessCare Frontend is a TypeScript-based web application for managing neonatal healthcare processes in a Neonatal Intensive Care Unit (NICU).

The frontend provides a user-friendly interface for healthcare staff to visualize newborn information, manage parent or guardian contacts, assign healthcare processes, and update the status of assigned processes.

For **Milestone 4 (Hito 4)**, the frontend is integrated with the ProcessCare backend through a REST API, replacing the previous local/mock data approach with real backend communication.

---

# Features

* View newborn clinical information.
* Display parent or guardian contact information.
* View healthcare processes assigned to a newborn.
* Assign new healthcare processes.
* Complete assigned healthcare processes.
* Cancel assigned healthcare processes.
* Display the current status of each process.
* Handle API loading states.
* Display error messages when API operations fail.
* Refresh process information after successful operations.
* Communicate asynchronously with the ProcessCare backend.

---

# Technology Stack

| Technology          | Purpose                                |
| ------------------- | -------------------------------------- |
| TypeScript          | Strongly typed application development |
| Vite                | Frontend development and build tool    |
| HTML5               | Application structure                  |
| CSS3                | Application styling                    |
| REST API            | Communication with the backend         |
| Fetch API           | HTTP requests                          |
| JavaScript Promises | Asynchronous operations                |

---

# Architecture

The frontend follows a modular architecture based on separation of responsibilities.

```text
src/
│
├── components/
│   ├── Header.ts
│   ├── PatientInfo.ts
│   ├── ProcessCard.ts
│   └── ...
│
├── models/
│   ├── index.ts
│   └── process.ts
│
├── services/
│   ├── newbornService.ts
│   └── processService.ts
│
├── assets/
│   └── styles.css
│
└── main.ts
```

### Components

Components are responsible for generating and managing the user interface.

Examples include:

* Header
* Patient information
* Process cards
* Process status controls

Components focus on presentation and user interaction.

### Services

The service layer is responsible for communication with the ProcessCare backend API.

Services handle operations such as:

* Retrieving newborn information.
* Retrieving assigned processes.
* Assigning processes.
* Completing processes.
* Cancelling processes.

This separation keeps API communication independent from UI logic.

### Models

TypeScript interfaces and enums represent the application domain.

Main models include:

* `Newborn`
* `ParentContact`
* `HealthcareProcess`
* `AssignedProcess`

Main enums include:

* `Gender`
* `Relationship`
* `ProcessStatus`

Strong typing is used throughout the application and the project avoids the use of `any`.

---

# Backend Integration

The frontend communicates with the ProcessCare backend through REST endpoints.

The backend is implemented using:

* Java 21
* Spring Boot
* Spring Web
* Spring Data JPA
* PostgreSQL
* Docker

The frontend and backend are maintained as separate projects/repositories.

```text
ProcessCare
│
├── processCare_Hito4
│   └── Spring Boot Backend
│
└── processcare-frontend
    └── TypeScript Frontend
```

The frontend development server runs on:

```text
http://localhost:5173
```

The backend API runs on:

```text
http://localhost:8080
```

---

# REST API

The frontend consumes the ProcessCare REST API under:

```text
/api/v1/newborns
```

## Get Newborn

```http
GET /api/v1/newborns/{newbornId}
```

Returns the clinical information and contact information of a newborn.

Example:

```json
{
  "id": 1,
  "name": "Newborn 1",
  "birthDateTime": "2026-08-20T10:30:00",
  "weight": 2.85,
  "gestationalAge": 36,
  "gender": "FEMALE",
  "admittedToNICU": true,
  "contacts": [
    {
      "fullName": "Mother of Newborn 1",
      "email": "mother@example.com",
      "phone": "+353871234567",
      "relationship": "MOTHER"
    }
  ]
}
```

---

## Get Assigned Processes

```http
GET /api/v1/newborns/{newbornId}/processes
```

Returns all healthcare processes assigned to the newborn.

Example:

```json
[
  {
    "newbornId": 1,
    "newbornName": "Newborn 1",
    "processName": "Eye Examination",
    "status": "PENDING"
  },
  {
    "newbornId": 1,
    "newbornName": "Newborn 1",
    "processName": "Hearing Test",
    "status": "COMPLETED"
  }
]
```

---

## Assign Process

```http
POST /api/v1/newborns/{newbornId}/processes
```

Assigns a healthcare process to the newborn.

Example request:

```json
{
  "processName": "Neonatal Screening"
}
```

The newly assigned process starts with:

```text
PENDING
```

---

## Complete Process

The frontend provides an action to complete a pending healthcare process.

The operation is sent to the backend API, which applies the corresponding business rule and changes the process status to:

```text
COMPLETED
```

---

## Cancel Process

The frontend provides an action to cancel a pending healthcare process.

The operation is sent to the backend API, which changes the process status to:

```text
CANCELLED
```

The resulting status can then be verified through:

```http
GET /api/v1/newborns/{newbornId}/processes
```

---

# Process Status

Healthcare processes use the following statuses:

```text
PENDING
COMPLETED
CANCELLED
```

The frontend displays the current status returned by the backend.

The main state flow is:

```text
        ┌──────────────┐
        │    PENDING   │
        └──────┬───────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌─────────────┐  ┌─────────────┐
│  COMPLETED  │  │  CANCELLED  │
└─────────────┘  └─────────────┘
```

The backend is responsible for enforcing the business rules associated with these state transitions.

---

# Asynchronous Programming

The frontend uses asynchronous programming to communicate with the backend.

Implemented techniques include:

* `async / await`
* `Promise`
* `try / catch`
* Fetch API
* Asynchronous UI updates

Example application flow:

```text
User Action
    │
    ▼
Frontend Component
    │
    ▼
Service Layer
    │
    ▼
REST API
    │
    ▼
Spring Boot Backend
    │
    ▼
PostgreSQL
    │
    ▼
API Response
    │
    ▼
Frontend UI Update
```

---

# Error Handling

The frontend handles errors returned by the backend API and provides feedback to the user.

Examples include:

* Newborn not found.
* Invalid process name.
* Process already assigned.
* Invalid process state.
* Server or network errors.

The backend uses structured error responses containing information such as:

```json
{
  "message": "Process is already assigned",
  "code": "BUSINESS_RULE_VIOLATION",
  "timestamp": "2026-08-28T08:33:37"
}
```

The frontend uses this information to display meaningful error messages.

---

# Loading States

The application provides visual feedback while asynchronous operations are being executed.

Loading states are used when:

* Retrieving newborn information.
* Retrieving assigned processes.
* Assigning a process.
* Completing a process.
* Cancelling a process.

After a successful operation, the relevant information is refreshed from the backend.

---

# TypeScript Practices

The project uses TypeScript to provide strong typing throughout the application.

The implementation focuses on:

* Interfaces.
* Enums.
* Explicit types.
* Type-safe function parameters.
* Type-safe API responses.
* DOM type checking.
* Avoidance of `any`.

The project has been checked to ensure that there are no explicit usages of the `any` type in the `src` directory.

---

# CORS

The backend provides CORS configuration to allow communication with the Vite development server.

The development frontend runs on:

```text
http://localhost:5173
```

The backend allows requests from this origin for the API endpoints.

---

# Project Structure

```text
processcare-frontend/
│
├── public/
│   └── ...
│
├── src/
│   │
│   ├── assets/
│   │   └── styles.css
│   │
│   ├── components/
│   │   ├── Header.ts
│   │   ├── PatientInfo.ts
│   │   ├── ProcessCard.ts
│   │   └── ...
│   │
│   ├── models/
│   │   ├── index.ts
│   │   └── process.ts
│   │
│   ├── services/
│   │   ├── newbornService.ts
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

# Running the Project

## Requirements

* Node.js
* npm
* ProcessCare Backend
* PostgreSQL through Docker

---

## 1. Clone the repository

```bash
git clone https://github.com/valehd/processcare-frontend.git
```

Navigate to the project:

```bash
cd processcare-frontend
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Start the Backend

The ProcessCare backend must be running before using the frontend.

From the backend repository:

```bash
docker compose up -d
```

Then start the Spring Boot application using the Maven Wrapper:

```bash
./mvnw spring-boot:run
```

The backend will be available at:

```text
http://localhost:8080
```

---

## 4. Start the Frontend

From the frontend repository:

```bash
npm run dev
```

Vite will provide the local development URL, normally:

```text
http://localhost:5173
```

---

# Testing the Integration

The frontend can be tested together with the backend by performing the following operations:

1. Open the frontend application.
2. Verify that newborn information is loaded.
3. Verify that assigned processes are displayed.
4. Assign a healthcare process.
5. Verify that the process appears with `PENDING` status.
6. Complete a process.
7. Verify that the status changes to `COMPLETED`.
8. Cancel a pending process.
9. Verify that the status changes to `CANCELLED`.
10. Refresh the application and verify that the information is retrieved from the backend database.

The backend API can also be verified independently using tools such as `curl` or Swagger UI.

---

# Backend API Documentation

During development, the ProcessCare backend provides interactive API documentation through Swagger UI.

```text
http://localhost:8080/swagger-ui.html
```

OpenAPI documentation:

```text
http://localhost:8080/api-docs
```

---

# Security and Configuration

Sensitive database credentials are not stored directly in the application source configuration.

The frontend does not contain database credentials.

Database credentials are handled by the backend environment configuration.

Environment-specific configuration should not expose passwords, tokens, API keys, or other sensitive information in the Git repository.

---

# Hito 4 Objectives

This frontend contributes to the Milestone 4 implementation by providing the presentation layer for the ProcessCare system.

The complete system demonstrates:

* Frontend and backend separation.
* REST API integration.
* TypeScript strong typing.
* Modular frontend architecture.
* Asynchronous communication.
* PostgreSQL persistence.
* Spring Boot backend.
* Docker containerization.
* Business rule enforcement in the backend.
* Error handling.
* Process state management.

---

# Author

**Valentina Hernández**

ProcessCare — 2026

Frontend developed as part of a Java and TypeScript backend/frontend development project, integrating a TypeScript application with a Spring Boot REST microservice and PostgreSQL persistence.
