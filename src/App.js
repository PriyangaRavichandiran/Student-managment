import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ListStudentsPage from './pages/ListStudentsPage';
import AddStudentPage from './pages/AddStudentPage';
import EditStudentPage from './pages/EditStudentPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<ListStudentsPage />} />
          <Route path="/add" element={<AddStudentPage />} />
          <Route path="/edit/:id" element={<EditStudentPage />} />
        </Routes>
      </div>
    </Router>
  );
}export default App;