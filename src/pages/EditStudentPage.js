import React, { useState, useEffect } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import StudentService from '../services/StudentService';

function EditStudentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        // Ensure id is parsed to a number
        const studentId = parseInt(id, 10);
        
        // Validate id
        if (isNaN(studentId)) {
          throw new Error('Invalid student ID');
        }

        // Fetch student by ID
        const fetchedStudent = await StudentService.getStudentById(studentId);
        
        // Check if student exists
        if (!fetchedStudent) {
          throw new Error('Student not found');
        }

        setStudent(fetchedStudent);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student details:', err);
        setError(err.message || 'Failed to fetch student details');
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // Handle update student logic
  const handleUpdateStudent = async (updatedStudent) => {
    try {
      // Update student via service
      await StudentService.updateStudent(id, updatedStudent);
      
      // Navigate back to student list
      navigate('/');
    } catch (err) {
      console.error('Failed to update student:', err);
      setError('Failed to update student');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          {error}
          <div className="mt-2">
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate('/')}
            >
              Back to Student List
            </button>
          </div>
        </Alert>
      </Container>
    );
  }

  // Render form if student data is available
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Edit Student</h2>
      
      {student && (
        <StudentForm 
          initialData={student}
          onSubmit={handleUpdateStudent}
        />
      )}
    </Container>
  );
}

export default EditStudentPage;