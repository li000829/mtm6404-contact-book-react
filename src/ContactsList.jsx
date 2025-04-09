import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./db";
import { Link } from "react-router-dom";
import { Button, Card, Typography, TextField, Box } from "@mui/material";

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
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Contact List 🌿
      </Typography>

      <Link to="/add">
        <Button variant="contained" color="success" sx={{ mb: 2 }}>
          Add Contact
        </Button>
      </Link>

      <TextField
        label="Search by name"
        variant="outlined"
        fullWidth
        value={search}
        onChange={e => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {filteredContacts.map(contact => (
        <Card
          key={contact.id}
          sx={{
            mb: 2,
            p: 2,
            boxShadow: 2,
            backgroundColor: "#f9f9f9", // 设置背景色
            transition: "background-color 0.3s ease, box-shadow 0.3s ease", // 平滑过渡效果
            "&:hover": {
              backgroundColor: "#e0e0e0", // 鼠标悬停时改变背景色
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // 增加悬停时的阴影
            },
          }}
        >
          <Typography variant="h6">
            <Link
              to={`/contacts/${contact.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {contact.firstName} {contact.lastName}
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {contact.email}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}
