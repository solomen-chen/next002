// src/app/contacts/components/ContactItem.js
export default function ContactItem({ contact, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-3 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{contact.name}</h3>
          <p className="text-gray-600 mt-1">📱 {contact.phone}</p>
          <p className="text-gray-600 mt-1">🏠 {contact.address}</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(contact)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 focus:outline-none"
          >
            編輯
          </button>
          
          <button
            onClick={() => onDelete(contact._id)}
            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  );
}