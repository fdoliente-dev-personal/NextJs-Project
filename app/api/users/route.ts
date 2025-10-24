import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "public", "users.json");

export async function POST(req: Request) {
  try {
    const newUser = await req.json();

    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);

    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const userWithId = { id: newId, ...newUser };

    const { email, phone, ...userResponse } = userWithId;

    users.push(userWithId);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true, user: userResponse });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add user" },
      { status: 500 }
    );
  }
}

