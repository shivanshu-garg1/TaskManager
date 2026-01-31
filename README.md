.

 Features
 Authentication & Authorization

Signup & Login

JWT authentication using httpOnly cookies

Role-based access (User / Admin)

Protected routes

Projects

Create, view, update, delete projects

Users can see only their own projects

Secure project ownership validation

Tasks

Create tasks under a project

View tasks project-wise

Update task status & priority

Delete tasks

Users can access tasks only for projects they own


Setup

1. Clone the Repository
2. Install the node modules using npm i in both (frontend,backend) folders
3. Add env file in backend folder
   1. PORT
   2. MONGODB_URL
   3. JWT_SECRET
4. Run Frontend using npm run dev
5. Run Backend using node server.js or nodemon server.js
