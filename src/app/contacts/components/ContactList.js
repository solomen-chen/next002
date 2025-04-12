// src/app/contacts/components/ContactList.js
import ContactItem from './ContactItem';

export default function ContactList({ contacts, onEdit, onDelete }) {
  if (contacts.length === 0) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="text-gray-500">尚未添加任何聯絡人</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">聯絡人列表</h2>
      
      <div>
        {contacts.map(contact => (
          <ContactItem
            key={contact._id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}