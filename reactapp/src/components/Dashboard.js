import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p className="text-center mt-5">Please login first.</p>;
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-primary">Dashboard</h2>

    {user.role === "SYSTEM_ADMIN" && (
  <>
    {/* Manage Users */}
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <h4>Manage Users</h4>
        <p>View, add, and update system users</p>
        <Button variant="primary" onClick={() => navigate("/manage-users")}>
          Go to Users
        </Button>
      </Card.Body>
    </Card>

    {/* Manage NGOs */}
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <h4>Manage NGOs</h4>
        <p>Manage NGO details and registrations</p>
        <Button variant="success" onClick={() => navigate("/manage-ngos")}>
          Go to NGOs
        </Button>
      </Card.Body>
    </Card>

    {/* Manage Causes */}
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <h4>Manage Causes</h4>
        <p>Oversee and organize supported causes</p>
        <Button variant="warning" onClick={() => navigate("/manage-causes")}>
          Go to Causes
        </Button>
      </Card.Body>
    </Card>
  </>
)}


      {user.role === "NGO_ADMIN" && (
        <Card className="mb-3 shadow-sm">
          <Card.Body>
            <h4>NGO Panel</h4>
            <p>Create and manage your causes</p>
            <Button variant="success" onClick={() => navigate("/manage-causes")}>
              Manage Causes
            </Button>
          </Card.Body>
        </Card>
      )}

      {user.role === "DONOR" && (
        <Card className="mb-3 shadow-sm">
          <Card.Body>
            <h4>Donor Panel</h4>
            <p>View your donations and contribute to causes</p>
            <Button variant="warning" onClick={() => navigate("/causes")}>
              Browse Causes
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}


