// src/app/contacts/page.js
"use client";
import { useState, useEffect } from "react";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: "", phone: "", address: "" });

  useEffect(() => {
    fetch("/api/contacts")
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  const handleAddOrEdit = async (e) => {
    e.preventDefault();
    const method = formData.id ? "PUT" : "POST";
    const endpoint = "/api/contacts";
    const body = JSON.stringify({
      id: formData.id,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
    });
    await fetch(endpoint, { method, headers: { "Content-Type": "application/json" }, body });
    setFormData({ id: null, name: "", phone: "", address: "" });
    const updatedContacts = await fetch(endpoint).then(res => res.json());
    setContacts(updatedContacts);
  };

  const handleDelete = async (id) => {
    const endpoint = "/api/contacts";
    const body = JSON.stringify({ id });
    await fetch(endpoint, { method: "DELETE", headers: { "Content-Type": "application/json" }, body });
    const updatedContacts = await fetch(endpoint).then(res => res.json());
    setContacts(updatedContacts);
  };

  const handleEdit = (contact) => {
    setFormData(contact);
  };

  return (
    <div>
      <h1>親友通訊錄</h1>
      <form onSubmit={handleAddOrEdit}>
        <input
          type="text"
          placeholder="姓名"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="手機"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="地址"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
        <button type="submit">{formData.id ? "修改" : "新增"}</button>
      </form>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} - {contact.phone} - {contact.address}
            <button onClick={() => handleEdit(contact)}>修改</button>
            <button onClick={() => handleDelete(contact._id)}>刪除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}