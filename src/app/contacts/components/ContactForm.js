// src/app/contacts/components/ContactForm.js
'use client';
import { useState, useEffect } from 'react';

export default function ContactForm({ onAddContact, editingContact, onUpdateContact, onCancelEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingContact) {
      setFormData({
        name: editingContact.name,
        phone: editingContact.phone,
        address: editingContact.address
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        address: ''
      });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (editingContact) {
        await onUpdateContact(editingContact._id, formData);
      } else {
        await onAddContact(formData);
        setFormData({ name: '', phone: '', address: '' });
      }
    } catch (err) {
      setError(err.message || '發生錯誤，請重試');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">
        {editingContact ? '編輯聯絡人' : '新增聯絡人'}
      </h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">姓名</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 "
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">手機</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-medium mb-2">地址</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          {editingContact && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              disabled={isSubmitting}
            >
              取消
            </button>
          )}
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? '處理中...' : editingContact ? '更新' : '新增'}
          </button>
        </div>
      </form>
    </div>
  );
}



