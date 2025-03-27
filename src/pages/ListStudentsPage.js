import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';

function ListStudentsPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const fetchedStudents = await StudentService.getAllStudents();
        setStudents(fetchedStudents);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Search and filter function
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Edit student handler
  const handleEditStudent = (id) => {
    navigate(`/edit/${id}`);
  };

  // Delete student handler
  const handleDeleteStudent = async (id) => {
    try {
      await StudentService.deleteStudent(id);
      setStudents(students.filter(student => student.id !== id));
    } catch (err) {
      setError('Failed to delete student');
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <h2>Student List</h2>
        </Col>
        <Col md={6} className="text-end">
          <Button 
            variant="success" 
            onClick={() => navigate('/add')}
          >
            Add New Student
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control 
            type="text" 
            placeholder="Search by name or course" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.age}</td>
              <td>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => handleEditStudent(student.id)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array.from({ 
              length: Math.ceil(filteredStudents.length / studentsPerPage) 
            }).map((_, index) => (
              <li 
                key={index} 
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <Button 
                  variant="outline-primary" 
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Container>
  );
}export default ListStudentsPage;