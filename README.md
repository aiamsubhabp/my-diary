# My Diary Application
## Description
**My Diary** is a web application for managing personal diary entries. Built using React for the frontend and Flask for the backend, this app allows users to create, read, update, and delete diary entries. Users can sign up, log in, and manage their diary entries securely. 

## Features
 - Secure user registration and login
 - Full CRUD operations for diary entries
 - User authentication with bcrypt

## Prerequisites
 - Python 3.8 or higher
 - Node.js and npm
 - Flask
 - Virtualenv

## API Endpoints
### Authentication
 - Signup: POST /api/signup - Create a new user account.
 - Login: POST /api/login - Authenticate a user and start a session.
 - Logout: DELETE /api/logout - End the user session.
 - Check Session: GET /api/check_session - Check if the user is logged in.
### Diary Entries
 - Retrieve All Entries: GET /api/entries - Get all diary entries for the logged-in user.
 - Create New Entry: POST /api/entries - Create a new diary entry.
 - Retrieve Entry by ID: GET /api/entries/<int:id> - Get a specific entry by ID.
 - Update Entry: PATCH /api/entries/<int:id> - Update a specific entry by ID.
 - Delete Entry: DELETE /api/entries/<int:id> - Delete a specific entry by ID.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
