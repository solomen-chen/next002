// src/app/contacts/api/route.js
import { NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import Contact from '../models/Contact';

export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find({}).sort({ name: 1 });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();
    const contact = await Contact.create(body);
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

