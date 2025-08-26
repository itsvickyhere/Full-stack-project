import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Card,
  Modal,
  Form,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { FaSortUp, FaSortDown } from "react-icons/fa";

export default function ManageCauses() {
  const [causes, setCauses] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedCause, setSelectedCause] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    startDate: "",
    endDate: "",
    ngoId: "",
  });
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const API_URL =
    "https://8080-aaaaacfcebbcefaebdbaacdebcdafaecaabbbabc.premiumproject.examly.io/api/causes";
  const NGO_API =
    "https://8080-aaaaacfcebbcefaebdbaacdebcdafaecaabbbabc.premiumproject.examly.io/api/ngos";

  // Fetch all active causes
  const fetchCauses = () => {
    fetch(`${API_URL}/active`)
      .then((res) => res.json())
      .then((data) => setCauses(data))
      .catch((err) => console.error(err));
  };

  // Fetch all NGOs
  const fetchNgos = () => {
    fetch(NGO_API)
      .then((res) => res.json())
      .then((data) => setNgos(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCauses();
    fetchNgos();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openModal = (type, cause = null) => {
    setModalType(type);
    setSelectedCause(cause);
    if (cause) {
      setFormData({
        title: cause.title || "",
        description: cause.description || "",
        targetAmount: cause.targetAmount || "",
        startDate: cause.startDate
          ? new Date(cause.startDate).toISOString().slice(0, 10)
          : "",
        endDate: cause.endDate
          ? new Date(cause.endDate).toISOString().slice(0, 10)
          : "",
        ngoId: cause.ngoId || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        targetAmount: "",
        startDate: "",
        endDate: "",
        ngoId: "",
      });
    }
    setShowModal(true);
    setError("");
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.ngoId) {
      setError("Please select an NGO before submitting.");
      return;
    }

    const method = modalType === "add" ? "POST" : "PUT";
    const url =
      modalType === "add" ? API_URL : `${API_URL}/${selectedCause.id}`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      await res.json();
      fetchCauses();
      closeModal();
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cause?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      fetchCauses();
    } catch (err) {
      alert(err.message || "Failed to delete cause");
    }
  };

  // Filtering
  const filteredCauses = causes.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting
  const sortedCauses = [...filteredCauses].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedCauses.length / pageSize);
  const paginatedCauses = sortedCauses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-primary">Manage Causes</h3>
          <Button variant="success" onClick={() => openModal("add")}>
            + Add Cause
          </Button>
        </div>

        {/* Search Bar */}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search causes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                ID {sortConfig.key === "id" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSort("title")}>
                Cause Name {sortConfig.key === "title" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th>Description</th>
              <th onClick={() => handleSort("targetAmount")}>
                Target Amount {sortConfig.key === "targetAmount" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>NGO</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCauses.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.title}</td>
                <td>{c.description}</td>
                <td>${c.targetAmount}</td>
                <td>
                  {c.startDate
                    ? new Date(c.startDate).toISOString().slice(0, 10)
                    : ""}
                </td>
                <td>
                  {c.endDate
                    ? new Date(c.endDate).toISOString().slice(0, 10)
                    : ""}
                </td>
                <td>{c.ngoName || c.ngoId}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => openModal("edit", c)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between align-items-center">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div>
            <Button
              variant="outline-primary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="me-2"
            >
              Prev
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "add" ? "Add Cause" : "Edit Cause"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Target Amount</Form.Label>
              <Form.Control
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select NGO</Form.Label>
              <Form.Select
                name="ngoId"
                value={formData.ngoId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select NGO --</option>
                {ngos.map((ngo) => (
                  <option key={ngo.id} value={ngo.id}>
                    {ngo.name} (ID: {ngo.id})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              {modalType === "add" ? "Add Cause" : "Update Cause"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}



