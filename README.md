# ProcessCare Frontend

## Neonatal Healthcare Process Management System

ProcessCare Frontend is a TypeScript-based web application for managing neonatal healthcare processes in a Neonatal Intensive Care Unit (NICU).

The frontend provides a user-friendly interface for healthcare staff to visualize newborn information, manage parent or guardian contacts, assign healthcare processes, and update the status of assigned processes.

For **Milestone 4 (Hito 4)**, the frontend is integrated with the ProcessCare backend through a REST API, replacing the previous local/mock data approach with real backend communication and PostgreSQL persistence.

---

# Features

* View newborn clinical information.
* Display parent or guardian contact information.
* View healthcare processes assigned to a newborn.
* Assign new healthcare processes.
* Complete assigned healthcare processes.
* Cancel assigned healthcare processes.
* Display the current status of each process.
* Display loading states during API operations.
* Display meaningful error messages when API operations fail.
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
├── events/
│   └── ProcessEvents.ts
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

### Events

The event layer handles user interactions related to healthcare process actions.

For example:

* Assigning a process.
* Completing a process.
* Cancelling a process.
* Refreshing process information after an operation.

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
* Spring Boot 3.5.5
* Spring Web
* Spring Data JPA
* PostgreSQL 16
* Docker Compose
* OpenAPI / Swagger

The frontend and backend are maintained as separate GitHub repositories.

```text
ProcessCare
│
├── processCare_frontend
│   └── TypeScript + Vite Frontend
│
└── ProcessCare_backend
    └── Spring Boot REST Backend
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

# GitHub Repositories

### Frontend

```text
https://github.com/valehd/processCare_frontend
```

### Backend

```text
https://github.com/valehd/ProcessCare_backend
```

The two repositories together form the complete ProcessCare application.

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

A newly assigned process starts with:

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

The operation is sent to the backend API, which applies the corresponding business rule and changes the process status to:

```text
CANCELLED
```

The resulting status can be verified through:

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

Application flow:

```text
User Action
    │
    ▼
Frontend Component
    │
    ▼
Event Handler
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
* Server errors.
* Network errors.

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
processCare_frontend/
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
│   ├── events/
│   │   └── ProcessEvents.ts
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

# Running the Complete Application

The ProcessCare system consists of two separate repositories:

```text
Frontend
processCare_frontend
        │
        │ REST API
        ▼
Backend
ProcessCare_backend
        │
        ▼
PostgreSQL
```

## Requirements

Install the following software:

* Node.js
* npm
* Java 21
* Docker Desktop

---

# 1. Clone the Backend

```bash
git clone https://github.com/valehd/ProcessCare_backend.git
```

Navigate to the backend:

```bash
cd ProcessCare_backend
```

---

# 2. Configure Backend Environment Variables

The backend does not store database passwords directly in the source code.

Create a `.env` file in the backend project root:

```text
DATABASE_PASSWORD=SecureDevPassword123
POSTGRES_PASSWORD=SecureDevPassword123
```

The `.env` file is ignored by Git and must not be committed to the repository.

---

# 3. Start PostgreSQL

From the backend project root:

```bash
docker compose up -d
```

Verify the database container:

```bash
docker compose ps
```

The PostgreSQL service uses:

```text
Database: processcare_db
User: dev_user
Port: 5432
```

---

# 4. Run Backend Tests

Using the Maven Wrapper:

```bash
./mvnw clean test
```

A successful build should finish with:

```text
BUILD SUCCESS
```

---

# 5. Start the Backend

Using the development profile:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

The backend will be available at:

```text
http://localhost:8080
```

---

# 6. Verify the Backend

Example:

```bash
curl http://localhost:8080/api/v1/newborns/1
```

To retrieve assigned processes:

```bash
curl http://localhost:8080/api/v1/newborns/1/processes
```

During development, Swagger UI is available at:

```text
http://localhost:8080/swagger-ui.html
```

OpenAPI documentation:

```text
http://localhost:8080/api-docs
```

---

# 7. Clone the Frontend

Open another terminal and clone the frontend repository:

```bash
git clone https://github.com/valehd/processCare_frontend.git
```

Navigate to the project:

```bash
cd processCare_frontend
```

---

# 8. Install Frontend Dependencies

```bash
npm install
```

---

# 9. Start the Frontend

```bash
npm run dev
```

Vite will provide the local development URL, normally:

```text
http://localhost:5173
```

The frontend requires the backend to be running on:

```text
http://localhost:8080
```

---

# Testing the Integration

The complete application can be tested using the following workflow:

1. Start PostgreSQL using Docker.
2. Start the Spring Boot backend.
3. Start the Vite frontend.
4. Open the frontend application.
5. Verify that newborn information is loaded.
6. Verify that assigned healthcare processes are displayed.
7. Assign a healthcare process.
8. Verify that the new process appears with `PENDING` status.
9. Complete a pending process.
10. Verify that the status changes to `COMPLETED`.
11. Cancel another pending process.
12. Verify that the status changes to `CANCELLED`.
13. Refresh the application.
14. Verify that the process statuses are retrieved from the backend database.

The backend API can also be verified independently using `curl` or Swagger UI.

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

The frontend does not contain database credentials.

Database credentials are handled by the backend environment configuration.

Sensitive information such as:

* Database passwords.
* API keys.
* Authentication tokens.
* Secrets.

must not be committed to GitHub.

The `.env` file is excluded from version control through `.gitignore`.

---

# Hito 4 Objectives

The frontend contributes to the Milestone 4 implementation by providing the presentation layer for the ProcessCare system.

The complete system demonstrates:

* Frontend and backend separation.
* REST API integration.
* TypeScript strong typing.
* Modular frontend architecture.
* Asynchronous communication.
* PostgreSQL persistence.
* Spring Boot backend.
* Docker containerization.
* Clean Architecture and DDD principles in the backend.
* Business rule enforcement in the backend.
* Error handling.
* Process state management.
* Automated backend testing.
* OpenAPI and Swagger documentation.

---

# Author

**Valentina Hernández**

ProcessCare — 2026

Frontend developed as part of a Java and TypeScript development project, integrating a TypeScript application with a Spring Boot REST microservice and PostgreSQL persistence.
