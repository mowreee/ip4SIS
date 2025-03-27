# Student Management Dashboard

This project is a Student Management Dashboard built with React for the frontend and Node.js for the backend. It allows users to add, edit, and delete student records.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)


## Installation

### Frontend

1. Navigate to the frontend directory:

   ```sh
   cd dashboard
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm start
   ```

### Backend

1. Navigate to the backend directory:

   ```sh
   cd server
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the server:

   ```sh
   npm start
   ```

## Usage

### Adding a Student

1. Click on the "Add Student" button.
2. Fill in the required fields.
3. Click "Submit" to add the student.

### Editing a Student

1. Click on the edit icon next to the student you want to edit.
2. Update the required fields.
3. Click "Update" to save the changes.

### Deleting a Student

1. Click on the delete icon next to the student you want to delete.
2. Confirm the deletion in the prompt.

## API Endpoints

### Add Student

- **URL:** `/api/addStudents`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "idNumber": "1",
    "Firstname": "John",
    "Lastname": "Doe",
    "Middlename": "A",
    "course": "CS",
    "year": "2"
  }
  ```
