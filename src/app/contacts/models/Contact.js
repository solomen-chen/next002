// src/app/contacts/models/Contact.js
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '請輸入姓名'],
    trim: true,
    maxlength: [50, '姓名不能超過50個字符'],
  },
  phone: {
    type: String,
    required: [true, '請輸入手機號碼'],
    trim: true,
    maxlength: [20, '手機號碼不能超過20個字符'],
  },
  address: {
    type: String,
    required: [true, '請輸入地址'],
    trim: true,
    maxlength: [200, '地址不能超過200個字符'],
  },
}, {
  timestamps: true
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);