// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactsList from "./ContactsList";
import AddContact from "./AddContact";
import ContactDetails from "./ContactDetails";
import EditContact from "./EditContact";
import '@mui/material/styles'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactsList />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/contacts/:id" element={<ContactDetails />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </Router>
  );
}

export default App;


