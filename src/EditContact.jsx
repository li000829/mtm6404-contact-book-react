// src/EditContact.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./db";

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
      } else {
        alert("Contact not found.");
        navigate("/");
      }
    };

    fetchContact();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "contacts", id), {
      firstName,
      lastName,
      email,
    });
    navigate(`/contacts/${id}`);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Edit Contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button>Save Changes</button>
        <button>Cancel</button>
      </form>
    </div>
  );
}

