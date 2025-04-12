// src/app/contacts/api/[id]/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../lib/mongodb';
import Contact from '../../models/Contact';

export async function GET(request, context) {
  try {
    // 先等待 params 解析完成
    
    const {id} = await context.params;
    await connectDB();
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return NextResponse.json(
        { success: false, message: '找不到該聯絡人' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, context) {
  try {
    // 先等待 params 解析完成
   
    const {id} = await context.params;
    const body = await request.json();
    
    await connectDB();
    const contact = await Contact.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return NextResponse.json(
        { success: false, message: '找不到該聯絡人' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    // 先等待 params 解析完成
   
    const {id} = await context.params;
    
    await connectDB();
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      return NextResponse.json(
        { success: false, message: '找不到該聯絡人' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}