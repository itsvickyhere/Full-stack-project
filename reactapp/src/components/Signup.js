// import React, { useState } from "react";
// import { Form, Button, Alert, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { signup } from "../utils/api";

// export default function Signup() {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [passwordHash, setPasswordHash] = useState("");
//   const [role, setRole] = useState("DONOR"); // default role
//   const [error, setError] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);

//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await signup({ name, username, email, passwordHash, role });
//       setShowSuccess(true);
//       setTimeout(() => {
//         setShowSuccess(false);
//         navigate("/login");
//       }, 2000);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
//     >
//       <Card className="p-4 shadow-sm" style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}>
//         <Card.Body>
//           <h2 className="text-center mb-4">Sign Up</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           {showSuccess && <Alert variant="success">Signup successful! Redirecting...</Alert>}
//           <Form onSubmit={handleSignup}>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Choose a username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter password"
//                 value={passwordHash}
//                 onChange={(e) => setPasswordHash(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Role</Form.Label>
//               <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
//                 <option value="SYSTEM_ADMIN">System Admin</option>
//                 <option value="NGO_ADMIN">NGO Admin</option>
//                 <option value="DONOR">Donor</option>
//               </Form.Select>
//             </Form.Group>

//             <Button variant="primary" type="submit" className="w-100">
//               Sign Up
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );

// }

import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [role, setRole] = useState("DONOR"); // default role
  const [approvalCode, setApprovalCode] = useState(""); // new state for code
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // 🔐 Check approval code if role = SYSTEM_ADMIN
    if (role === "SYSTEM_ADMIN" && approvalCode !== "5821") {
      setError("Invalid approval code for System Admin signup.");
      return;
    }

    try {
      await signup({ name, username, email, passwordHash, role });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <Card
        className="p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {showSuccess && (
            <Alert variant="success">Signup successful! Redirecting...</Alert>
          )}
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={passwordHash}
                onChange={(e) => setPasswordHash(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="SYSTEM_ADMIN">System Admin</option>
                <option value="NGO_ADMIN">NGO Admin</option>
                <option value="DONOR">Donor</option>
              </Form.Select>
            </Form.Group>

            {/* Show approval code input only for System Admin */}
            {role === "SYSTEM_ADMIN" && (
              <Form.Group className="mb-3">
                <Form.Label>Approval Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter approval code"
                  value={approvalCode}
                  onChange={(e) => setApprovalCode(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
