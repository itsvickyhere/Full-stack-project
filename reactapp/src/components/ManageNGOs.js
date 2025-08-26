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

export default function ManageNGOs() {
  const [ngos, setNgos] = useState([]);
  const [filteredNgos, setFilteredNgos] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [currentNGO, setCurrentNGO] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ngosPerPage = 5;

  // ✅ Fetch NGOs
  useEffect(() => {
    fetch("https://8080-aaaaacfcebbcefaebdbaacdebcdafaecaabbbabc.premiumproject.examly.io/api/ngos")
      .then((res) => res.json())
      .then((data) => {
        setNgos(data);
        setFilteredNgos(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Search filter
  useEffect(() => {
    let result = ngos.filter((n) => {
      const name = n?.name?.toLowerCase() || "";
      const email = n?.contactEmail?.toLowerCase() || "";
      const regNo = n?.registrationNumber?.toLowerCase() || "";
      return (
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase()) ||
        regNo.includes(search.toLowerCase())
      );
    });
    setFilteredNgos(result);
    setCurrentPage(1);
  }, [search, ngos]);

  // ✅ Sort by name
  const handleSort = () => {
    const sorted = [...filteredNgos].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setFilteredNgos(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Pagination logic
  const indexOfLast = currentPage * ngosPerPage;
  const indexOfFirst = indexOfLast - ngosPerPage;
  const currentNgos = filteredNgos.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredNgos.length / ngosPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  // Modal handlers
  const handleShowModal = (ngo = null) => {
    setCurrentNGO(
      ngo || { name: "", description: "", contactEmail: "", registrationNumber: "" }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentNGO(null);
    setShowModal(false);
  };

  // ✅ Save NGO
  const handleSaveNGO = () => {
    if (currentNGO.id) {
      // Update
      fetch(`https://8080-aaaaacfcebbcefaebdbaacdebcdafaecaabbbabc.premiumproject.examly.io/api/ngos/${currentNGO.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentNGO),
      })
        .then((res) => res.json())
        .then((updated) => {
          setNgos(ngos.map((n) => (n.id === updated.id ? updated : n)));
          handleCloseModal();
        })
        .catch((err) => console.error(err));
    } else {
      // Add
      fetch("https://8080-aaaaacfcebbcefaebdbaacdebcdafaecaabbbabc.premiumproject.examly.io/api/ngos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentNGO),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(text);
            });
          }
          return res.json();
        })
        .then((newNGO) => {
          setNgos([...ngos, newNGO]);
          handleCloseModal();
        })
        .catch((err) => {
          console.error("Error adding NGO:", err.message);
          alert("Failed to add NGO: " + err.message);
        });
    }
  };

  // ✅ Delete NGO
  const handleDeleteNGO = (id) => {
    if (window.confirm("Are you sure you want to delete this NGO?")) {
      fetch(`https://8080-aaaaacfcebbcefaebdbaacdebcdafaecaabbbabc.premiumproject.examly.io/api/ngos/${id}`, { method: "DELETE" })
        .then(() => {
          setNgos(ngos.filter((n) => n.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-3">
        <h3 className="mb-3 text-primary">Manage NGOs</h3>

        {/* Search + Add NGO */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <InputGroup style={{ width: "300px" }}>
            <Form.Control
              type="text"
              placeholder="Search by name, email or reg no..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <Button onClick={() => handleShowModal()} variant="success">
            + Add NGO
          </Button>
        </div>

        {/* NGOs Table */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th onClick={handleSort} style={{ cursor: "pointer" }}>
                Name {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th>Email</th>
              <th>Registration No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentNgos.map((n) => (
              <tr key={n.id}>
                <td>{n.id}</td>
                <td>{n.name}</td>
                <td>{n.contactEmail}</td>
                <td>{n.registrationNumber}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleShowModal(n)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteNGO(n.id)}
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

      {/* Add/Edit NGO Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentNGO?.id ? "Edit NGO" : "Add NGO"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentNGO?.name || ""}
                onChange={(e) =>
                  setCurrentNGO({ ...currentNGO, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentNGO?.description || ""}
                onChange={(e) =>
                  setCurrentNGO({ ...currentNGO, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="email"
                value={currentNGO?.contactEmail || ""}
                onChange={(e) =>
                  setCurrentNGO({ ...currentNGO, contactEmail: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Registration Number</Form.Label>
              <Form.Control
                type="text"
                value={currentNGO?.registrationNumber || ""}
                onChange={(e) =>
                  setCurrentNGO({
                    ...currentNGO,
                    registrationNumber: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveNGO}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
