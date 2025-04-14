// src/app/contacts/page.js
'use client';
import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Head from 'next/head'; // 從 next/head 引入


export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/contacts/api');
      const data = await res.json();
      
      if (data.success) {
        setContacts(data.data);
      } else {
        setError('無法獲取聯絡人列表');
      }
    } catch (err) {
      setError('發生錯誤，請重試');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (contactData) => {
    try {
      const res = await fetch('/contacts/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setContacts(prev => [...prev, data.data]);
        return data.data;
      } else {
        throw new Error(data.message || '無法新增聯絡人');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleUpdateContact = async (id, contactData) => {
    if (!id) {
      throw new Error('聯絡人ID為空');
    }
    
    try {
      // 確保 id 為字符串類型
      const contactId = String(id);
      
      const res = await fetch(`/contacts/api/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('更新錯誤:', errorText);
        throw new Error(`更新請求失敗: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      
      if (data.success) {
        setContacts(prev => 
          prev.map(contact => 
            contact._id === id ? data.data : contact
          )
        );
        setEditingContact(null);
        return data.data;
      } else {
        throw new Error(data.message || '無法更新聯絡人');
      }
    } catch (err) {
      console.error('更新聯絡人時出錯:', err);
      throw err;
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('確定要刪除此聯絡人嗎？')) {
      return;
    }
    
    try {
      const res = await fetch(`/contacts/api/${id}`, {
        method: 'DELETE',
      });
      
      const data = await res.json();
      
      if (data.success) {
        setContacts(prev => prev.filter(contact => contact._id !== id));
      } else {
        setError(data.message || '無法刪除聯絡人');
      }
    } catch (err) {
      setError('刪除時發生錯誤');
      console.error(err);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  return (
    <>
      
        <title>親友通訊錄</title>
        {/* <meta name="description" content="管理您的親友聯絡人資訊" /> */}

     
      <main className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">親友通訊錄</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
            <button 
              className="ml-2 underline" 
              onClick={() => setError('')}
            >
              關閉
            </button>
          </div>
        )}
        
        <ContactForm 
          onAddContact={handleAddContact}
          editingContact={editingContact}
          onUpdateContact={handleUpdateContact}
          onCancelEdit={handleCancelEdit}
        />
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">載入中...</p>
          </div>
        ) : (
          <ContactList 
            contacts={contacts}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
          />
        )}
      </main>
    </>);
}