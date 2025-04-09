// src/ContactDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "./db";
import { Button, Box } from "@mui/material";

export default function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact({ id: docSnap.id, ...docSnap.data() });
      } else {
        alert("Contact not found.");
        navigate("/");
      }
    };

    fetchContact();
  }, [id, navigate]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this contact?");
    if (confirm) {
      await deleteDoc(doc(db, "contacts", id));
      navigate("/");
    }
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 4,
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <h1>Contact Details</h1>
      <p><strong>First Name:</strong> {contact.firstName}</p>
      <p><strong>Last Name:</strong> {contact.lastName}</p>
      <p><strong>Email:</strong> {contact.email}</p>

      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <Link to={`/edit/${contact.id}`}>
          <Button variant="contained" color="primary" sx={{ width: 100 }}>
            Edit
          </Button>
        </Link>

        <Button
          onClick={handleDelete}
          sx={{
            backgroundColor: "#D1A15C", // 土黄色背景
            "&:hover": { backgroundColor: "#B88A4D" }, // 深一点的土黄色背景
            color: "white",
            width: 100,
          }}
        >
          Delete
        </Button>

        <Button
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#4e7f96", // 设置背景色为蓝色
            "&:hover": { backgroundColor: "#3a6274" }, // 鼠标悬停时深蓝色
            color: "white",
            width: 100,
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}

