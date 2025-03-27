import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function StudentForm({ 
  initialData = {
    name: '',
    email: '',
    course: '',
    age: ''
  }, 
  onSubmit 
}) {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState(initialData);
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Touched state for dynamic validation
  const [touched, setTouched] = useState({});

  // Validate form on input change
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Invalid email format';
        return '';
      
      case 'course':
        if (!value.trim()) return 'Course is required';
        return '';
      
      case 'age':
        const ageValue = parseInt(value);
        if (!value.toString().trim()) return 'Age is required';
        if (isNaN(ageValue) || ageValue < 16 || ageValue > 100) 
          return 'Age must be between 16 and 100';
        return '';
      
      default:
        return '';
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    
    // Validate each field
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate individual field
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle blur event
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate field
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const touchedFields = {};
    Object.keys(formData).forEach(key => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    // Validate entire form
    if (validateForm()) {
      // Convert age to number
      const studentData = {
        ...formData,
        age: parseInt(formData.age)
      };

      // Call submit handler
      onSubmit(studentData);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {touched.name && errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {touched.email && errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.course && !!errors.course}
              />
              <Form.Control.Feedback type="invalid">
                {touched.course && errors.course}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.age && !!errors.age}
              />
              <Form.Control.Feedback type="invalid">
                {touched.age && errors.age}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          {initialData.id ? 'Update Student' : 'Add Student'}
        </Button>
        <Button 
          variant="secondary" 
          className="ms-2"
          onClick={() => navigate('/')}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
}

export default StudentForm;