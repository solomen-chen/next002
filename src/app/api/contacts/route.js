// src/app/api/contacts/route.js

import clientPromise from "@/lib/mongodb";

let contacts = [];

// GET: 取得所有聯絡人
export async function GET(req) {
  const client = await clientPromise;
  const db = client.db("contactsDB");
  const contacts = await db.collection("contacts").find().toArray();
  return new Response(JSON.stringify(contacts), { status: 200 });
}


// export async function GET(req) {
//   return new Response(JSON.stringify(contacts), { status: 200 });
// }

// POST: 新增聯絡人
export async function POST(req) {
  const client = await clientPromise;
  const db = client.db("contactsDB");
  const { name, phone, address } = await req.json();
  const newContact = { name, phone, address };
  const result = await db.collection("contacts").insertOne(newContact);
  return new Response(JSON.stringify(result.ops[0]), { status: 201 });
}

// PUT: 修改聯絡人
export async function PUT(req) {
  const client = await clientPromise;
  const db = client.db("contactsDB");
  const { id, name, phone, address } = await req.json();
  const result = await db.collection("contacts").updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, phone, address } }
  );
  return new Response(JSON.stringify(result), { status: 200 });
}


// DELETE: 刪除聯絡人
export async function DELETE(req) {
  const client = await clientPromise;
  const db = client.db("contactsDB");
  const { id } = await req.json();
  const result = await db.collection("contacts").deleteOne({ _id: new ObjectId(id) });
  return new Response(JSON.stringify({ message: "Contact deleted" }), { status: 200 });
}
