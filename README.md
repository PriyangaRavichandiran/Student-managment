# Student Management React Application

## Overview
A full-featured Student Management application built with React, utilizing React Router for navigation, React Bootstrap for styling, and JSON Server as a mock backend for development.

## Features
- ✅ View paginated list of students
- ✅ Search and filter students by name, email, or course
- ✅ Add new students with comprehensive form validation
- ✅ Edit existing student details
- ✅ Delete students from the list
- ✅ Responsive design with React Bootstrap
- ✅ Error handling and loading states
- ✅ Client-side form validation
- ✅ Mock backend with JSON Server

## Project Structure
```
student-management-app/
│
├── public/                 # Public assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Navigation.js
│   │   └── StudentForm.js
│   │
│   ├── pages/              # Page components
│   │   ├── ListStudentsPage.js
│   │   ├── AddStudentPage.js
│   │   └── EditStudentPage.js
│   │
│   ├── services/           # API service
│   │   └── StudentService.js
│   │
│   ├── App.js              # Main application routing
│   └── App.css             # Global styles
│
├── db.json                 # Mock backend data
└── package.json            # Project dependencies and scripts
```

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/student-management-app.git
cd student-management-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Global Dependencies
```bash
npm install -g json-server concurrently
```

## Configuration

### Mock Backend (JSON Server)
- The application uses JSON Server to simulate a backend API
- Initial student data is stored in `db.json`
- JSON Server will create a mock REST API on `http://localhost:3001`

### Proxy Configuration
The `package.json` includes a proxy setting to handle API requests during development:
```json
"proxy": "http://localhost:3001"
```

## Available Scripts

### Development
```bash
npm run dev
```
- Starts React development server on `http://localhost:3000`
- Starts JSON Server on `http://localhost:3001`
- Runs both concurrently

### Start React App
```bash
npm start
```

### Start Mock Backend
```bash
npm run server
```

### Build for Production
```bash
npm run build
```

## API Endpoints
JSON Server provides the following RESTful endpoints:

- `GET /students`: Retrieve all students
- `GET /students/:id`: Retrieve a specific student
- `POST /students`: Create a new student
- `PUT /students/:id`: Update an existing student
- `DELETE /students/:id`: Delete a student

## Technologies Used
- React
- React Router
- React Bootstrap
- Axios
- JSON Server
- JavaScript (ES6+)

## Form Validation
The application includes comprehensive form validation:
- Name: Required, minimum 2 characters
- Email: Required, valid email format
- Course: Required
- Age: Required, between 16 and 100

## State Management
- Local component state using React Hooks
- Centralized service for API interactions

## Potential Improvements
- Implement real backend integration
- Add user authentication
- Enhance error handling
- Add comprehensive unit and integration tests
- Implement more advanced filtering and sorting

## Troubleshooting
- Ensure all dependencies are installed
- Check that JSON Server is running on port 3001
- Verify network connectivity
- Check browser console for any errors

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Your Name - priyanga2941@gmail.com

Project Link: [(https://github.com/PriyangaRavichandiran/Student-managment/)](https://github.com/PriyangaRavichandiran/Student-managment/)
