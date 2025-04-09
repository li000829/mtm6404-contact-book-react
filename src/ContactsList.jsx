// src/ContactsList.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Link } from "react-router-dom";

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsCol = collection(db, "contacts");
      const snapshot = await getDocs(contactsCol);
      const contactsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched contacts:", contactsData);
      contactsData.sort((a, b) => a.lastName.localeCompare(b.lastName));
      setContacts(contactsData);
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Contact List</h1>

      <Link to="/add">
        <button style={{ marginBottom: "20px" }}>Add Contact</button>
      </Link>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          fontSize: "1rem",
          marginBottom: "30px",
        }}
      />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredContacts.map(contact => (
          <li key={contact.id} style={{
            marginBottom: "15px",
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#f9f9f9"
          }}>
            <Link to={`/contacts/${contact.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <strong>{contact.firstName} {contact.lastName}</strong>
              <br />
              <span>{contact.email}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}



