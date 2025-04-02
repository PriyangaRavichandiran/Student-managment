import axios from 'axios';

// Base URL for JSON Server
 const API_BASE_URL = 'https://67ed3a5c4387d9117bbcd3a0.mockapi.io/students';


class StudentService {
  // Get all students
  static async getAllStudents() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error fetching students');
    }
  }

  // Get student by ID
  static async getStudentById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error, `Error fetching student with id ${id}`);
    }
  }

  // Create a new student with incremental ID
  static async createStudent(studentData) {
    try {
      // First, fetch existing students to determine the next ID
      const existingStudents = await this.getAllStudents();
      
      // Find the maximum existing ID and increment
      const newId = existingStudents.length > 0 
        ? String(Math.max(...existingStudents.map(s => s.id)) + 1 )
        : 1;

      // Create student with the new incremental ID
      const studentWithId = {
        ...studentData,
        id: newId
      };

      // Post the student with the assigned ID
      const response = await axios.post(API_BASE_URL, studentWithId);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error creating student');
    }
  }

  // Update a student
  static async updateStudent(id, studentData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, {
        ...studentData,
        id: parseInt(id)
      });
      return response.data;
    } catch (error) {
      this.handleError(error, `Error updating student with id ${id}`);
    }
  }

  // Delete a student
  static async deleteStudent(id) {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      return id;
    } catch (error) {
      this.handleError(error, `Error deleting student with id ${id}`);
    }
  }

  // Search students (client-side filtering)
  static async searchStudents(query) {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data.filter(student => 
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.email.toLowerCase().includes(query.toLowerCase()) ||
        student.course.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      this.handleError(error, 'Error searching students');
    }
  }

  // Centralized error handling
  static handleError(error, message) {
    if (error.response) {
      console.error(message, error.response.data);
      throw new Error(error.response.data.message || message);
    } else if (error.request) {
      console.error(message, 'No response received');
      throw new Error('No response from server');
    } else {
      console.error(message, error.message);
      throw error;
    }
  }
}

export default StudentService;