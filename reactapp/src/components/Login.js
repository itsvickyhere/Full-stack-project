import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login({ username, passwordHash });
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <Card
        className="shadow-sm"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "12px",
          padding: "30px 25px",
          textAlign: "center",
        }}
      >
        {/* App Name */}
        <h1 style={{ fontWeight: 700, color: "#2c3e50", fontSize: "1.9rem", marginBottom: "15px" }}>
          Online Donation Platform
        </h1>
        <hr style={{ width: "60px", borderTop: "3px solid #3498db", margin: "0 auto 25px auto" }} />

        {error && <Alert variant="danger">{error}</Alert>}

        {/* Login Form */}
        <Form onSubmit={handleLogin} className="text-left">
          <Form.Group className="mb-4" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={passwordHash}
              onChange={(e) => setPasswordHash(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3" style={{ padding: "10px 0" }}>
            Login
          </Button>
        </Form>

        <div style={{ marginTop: "10px" }}>
          <span>New user? </span>
          <a href="/signup">Sign up here</a>
        </div>
      </Card>
    </div>
  );
}
