import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Admin() {
    const navigate = useNavigate(); // Initialize useNavigate
    // Retrieve user info from local storage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleLogout = () => {
        localStorage.removeItem("userInfo"); // Clear user info from local storage
        navigate('/register'); // Redirect to signup page
    };

    return (
        <Container className="mt-4">
            <h1>Admin Page</h1>
            {userInfo ? (
                <Card className="user-info">    
                    <Card.Body>
                        <Card.Title>Welcome, {userInfo.name}!</Card.Title>
                        <Card.Text>Email: {userInfo.email}</Card.Text>
                        <Card.Text>Mobile Number: {userInfo.mobileNumber}</Card.Text>
                        <Button variant="primary" className="mr-2">Manage Users</Button>
                        <Button variant="secondary" className="mr-2">View Reports</Button>
                        <Button variant="danger" onClick={handleLogout}>Logout</Button>
                    </Card.Body>
                </Card>
            ) : (
                <div>
                    <p>No user information available. Please log in.</p>
                    <Button variant="success" onClick={() => navigate('/login')} className="mr-2">Login</Button>
                    <Button variant="info" onClick={() => navigate('/register')}>Register</Button>
                </div>
            )}
        </Container>
    );
}

export default Admin;