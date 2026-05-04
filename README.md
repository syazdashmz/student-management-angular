# Student Management Training Portal

This project is an Angular fullstack training frontend built for the **MyMahir Fullstack Developer Track**. It started as a calculator project and was expanded into a complete Angular learning portal covering routing, Angular Material, forms, services, HttpClient, local storage, JWT authentication, route guards, PWA preparation, and deployment practice.

The project was generated using [Angular CLI](https://github.com/angular/angular-cli) version **21.2.9**.

---

## Project Overview

This Angular application connects to an Express.js + MySQL backend API and demonstrates the major frontend topics covered in the Angular training module.

Main features include:

- Advanced calculator with validation and mathematical error handling
- To-Do List with browser localStorage
- Public API demo using Angular HttpClient
- Student Management page using Express + MySQL API
- Add Student form with Reactive Forms validation
- JWT login flow
- Auth Guard for protected routes
- Angular Material UI components
- Responsive layout
- Unit testing with Vitest
- Ready for PWA and Firebase Hosting deployment

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular |
| UI Library | Angular Material |
| Language | TypeScript |
| Forms | Reactive Forms |
| API Client | Angular HttpClient |
| Auth | JWT Token Storage |
| Routing | Angular Router |
| Testing | Vitest |
| Backend API | Express.js |
| Database | MySQL |
| Deployment Target | Firebase Hosting / Static Hosting |

---

## Project Routes

| Route | Description |
|---|---|
| `/calculator` | Advanced calculator module |
| `/todo` | To-Do List using localStorage |
| `/api-get` | Public API demo using HttpClient |
| `/students` | Student list from Express + MySQL API |
| `/students/form` | Add student form, protected by Auth Guard |
| `/login` | JWT login page |

---

## Backend API Requirement

This Angular frontend expects an Express.js backend running at:

```bash
http://localhost:3000/api

The API base URL is configured inside:

src/environments/environment.ts

Example:

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',
};

Required backend endpoints:

Method	Endpoint	Purpose
GET	/api/students	Get all students
POST	/api/students/add	Add new student
POST	/api/auth/login	Login and receive JWT token
GET	/api/reports	Reports API, optional/backend demo

Angular does not connect directly to MySQL. The correct flow is:

Angular Frontend → Express REST API → MySQL Database
Installation

Clone the repository:

git clone https://github.com/YOUR_USERNAME/student-management-angular.git

Go into the project folder:

cd student-management-angular

Install dependencies:

npm install
Development Server

To start a local development server:

ng serve

Then open:

http://localhost:4200/

The application will automatically reload whenever source files are changed.

Running the Backend

Make sure the Express.js backend is also running before testing the Student Management and Login features.

Example backend command:

npm start

or:

node server.js

Backend should run at:

http://localhost:3000

Test the student API directly:

http://localhost:3000/api/students

Expected response format:

{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Danish Syazani",
      "student_no": "STD0001",
      "email": "danish.syazani@gmail.com",
      "phone": "0128330631",
      "type": "student"
    }
  ]
}
Code Scaffolding

Angular CLI includes scaffolding tools.

Generate a component:

ng generate component pages/example --standalone

Generate a service:

ng generate service services/example

Generate a guard:

ng generate guard guards/example

Generate a pipe:

ng generate pipe pipes/example

For more options:

ng generate --help
Build

To build the project:

ng build

The build output will be stored in:

dist/angular-calculator

For production build:

ng build --configuration production
Running Unit Tests

To execute unit tests with Vitest:

ng test

For a one-time test run:

ng test --watch=false

Current verified status:

Build: Passed
Tests: Passed
Authentication Flow

The app uses JWT-based authentication.

Login flow:

User submits login form
→ Angular sends POST /api/auth/login
→ Express validates user
→ Express returns JWT token
→ Angular stores token in localStorage
→ Angular Auth Guard allows protected route access

Protected route:

/students/form

If no token exists, the user is redirected to:

/login
Important Security Notes

Do not store sensitive credentials in Angular.

Never put these in Angular files:

MySQL password
JWT secret
Database host credentials
Private API keys

These must stay inside the Express backend .env file.

Angular frontend environment files should only contain public frontend configuration such as:

apiBaseUrl: 'http://localhost:3000/api'
PWA Setup

To add Progressive Web App support:

ng add @angular/pwa

Then build the app:

ng build --configuration production

Service workers require HTTPS in production, so deploy to a hosting provider such as Firebase Hosting, Netlify, Vercel, or GitHub Pages.

Firebase Hosting Deployment

Install Firebase CLI:

npm install -g firebase-tools

Login:

firebase login

Initialize Firebase Hosting:

firebase init hosting

Recommended answers:

Hosting: Configure files for Firebase Hosting
Use an existing project
Public directory: dist/angular-calculator
Configure as a single-page app: Yes
Set up automatic builds with GitHub: No
Overwrite index.html: No

Deploy:

firebase deploy

If the production build creates a browser folder, use this as the public directory instead:

dist/angular-calculator/browser
Main Folder Structure
src/
  app/
    components/
      dialog-add/
    guards/
      auth.ts
    pages/
      api-get/
      calculator/
      login-page/
      students-form-page/
      students-page/
      to-do/
    pipes/
    services/
      api.ts
      auth.ts
      data.ts
    shared/
      shared-modules/
        shared-modules.ts
    app.config.ts
    app.routes.ts
    app.ts
    app.html
    app.scss
  environments/
    environment.ts
Learning Modules Covered

This project covers:

Angular project setup
Folder structure
TypeScript basics
Components
Routes and navigation
Angular Material
Reactive Forms
Services and Dependency Injection
Local Storage
HttpClient
GET and POST API requests
JWT authentication
Angular Guards
Pipes
PWA preparation
Firebase deployment
Additional Resources
Angular CLI Documentation
Angular HttpClient Guide
Angular Material
Firebase Hosting