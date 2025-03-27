import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import StudentService from '../services/StudentService';

function AddStudentPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Handle add student logic
  const handleAddStudent = async (newStudent) => {
    try {
      // Add student via service and capture the returned student with ID
      const addedStudent = await StudentService.createStudent(newStudent);
      
      // Navigate to edit page of newly created student
      // This assumes the backend returns the full student object with an ID
      if (addedStudent && addedStudent.id) {
        navigate(`/edit/${addedStudent.id}`);
      } else {
        // Fallback to student list if no ID is returned
        navigate('/');
      }
    } catch (err) {
      setError('Failed to add student');
      console.error(err);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Add New Student</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <StudentForm 
        onSubmit={handleAddStudent}
      />
    </Container>
  );
}

export default AddStudentPage;