import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Card,
  Form,
  InputGroup,
  Modal,
  Pagination,
} from "react-bootstrap";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // ✅ Fetch users
  useEffect(() => {
    fetch(
      "https://8080-aaaaacfcebbcefaebdbaacdebcdafaecaabbbabc.premiumproject.examly.io/api/auth"
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Search filter
  useEffect(() => {
    let result = users.filter((u) => {
      const username = u?.username?.toLowerCase() || "";
      const email = u?.email?.toLowerCase() || "";
      return (
        username.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase())
      );
    });
    setFilteredUsers(result);
    setCurrentPage(1);
  }, [search, users]);

  // ✅ Sort by username
  const handleSort = () => {
    const sorted = [...filteredUsers].sort((a, b) =>
      sortOrder === "asc"
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username)
    );
    setFilteredUsers(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  // Modal handlers
  const handleShowModal = (user = null) => {
    setCurrentUser(user || { name: "", username: "", email: "", role: "DONOR", passwordHash: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentUser(null);
    setShowModal(false);
  };

  // ✅ Save user
  const handleSaveUser = () => {
    if (currentUser.id) {
      // Update user
      fetch(
        `https://8080-aaaaacfcebbcefaebdbaacdebcdafaecaabbbabc.premiumproject.examly.io/api/auth/${currentUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentUser),
        }
      )
        .then((res) => res.json())
        .then((updated) => {
          setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
          handleCloseModal();
        })
        .catch((err) => console.error(err));
    } else {
      // Add new user
      fetch(
        `https://8080-aaaaacfcebbcefaebdbaacdebcdafaecaabbbabc.premiumproject.examly.io/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentUser),
        }
      )
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(text);
            });
          }
          return res.json();
        })
        .then((newUser) => {
          setUsers([...users, newUser]);
          handleCloseModal();
        })
        .catch((err) => {
          console.error("Error adding user:", err.message);
          alert("Failed to add user: " + err.message);
        });
    }
  };

  // ✅ Delete user
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(
        `https://8080-aaaaacfcebbcefaebdbaacdebcdafaecaabbbabc.premiumproject.examly.io/api/auth/${id}`,
        { method: "DELETE" }
      )
        .then(() => {
          setUsers(users.filter((u) => u.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-3">
        <h3 className="mb-3 text-primary">Manage Users</h3>

        {/* Search + Add User */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <InputGroup style={{ width: "300px" }}>
            <Form.Control
              type="text"
              placeholder="Search by username or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <Button onClick={() => handleShowModal()} variant="success">
            + Add User
          </Button>
        </div>

        {/* Users Table */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th onClick={handleSort} style={{ cursor: "pointer" }}>
                Username {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowModal(u)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteUser(u.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination className="justify-content-center">
          {[...Array(totalPages).keys()].map((num) => (
            <Pagination.Item
              key={num + 1}
              active={num + 1 === currentPage}
              onClick={() => handlePageChange(num + 1)}
            >
              {num + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Card>

      {/* Add/Edit User Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentUser?.id ? "Edit User" : "Add User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentUser?.name || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={currentUser?.username || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, username: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentUser?.email || ""}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={currentUser?.role || "DONOR"}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, role: e.target.value })
                }
              >
                <option value="DONOR">Donor</option>
                <option value="SYSTEM_ADMIN">Admin</option>
                <option value="NGO_ADMIN">NGO Admin</option>
              </Form.Select>
            </Form.Group>

            {!currentUser?.id && (
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={currentUser?.passwordHash || ""}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      passwordHash: e.target.value,
                    })
                  }
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}


