// src/ContactDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

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
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Contact Details</h1>

      <div>
        <p><strong>First Name:</strong> {contact.firstName}</p>
        <p><strong>Last Name:</strong> {contact.lastName}</p>
        <p><strong>Email:</strong> {contact.email}</p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "center" }}>
        <Link to={`/edit/${contact.id}`}>
          <button className="primary">Edit</button>
        </Link>
        <button onClick={handleDelete} className="danger">Delete</button>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </div>
  );
}


