import React, { useState } from 'react';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Mock data - we'll replace this with actual API calls later
const MOCK_STUDENTS = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    course: 'Computer Science', 
    age: 22 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    course: 'Data Science', 
    age: 23 
  },
  { 
    id: 3, 
    name: 'Mike Johnson', 
    email: 'mike.johnson@example.com', 
    course: 'Software Engineering', 
    age: 24 
  }
];

function StudentList() {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

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

  // Delete student handler (mock implementation)
  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <Container>
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
}

export default StudentList;