import { NextResponse } from "next/server";

let users: {name: string}[] = [];  //acting as a temporary in memory database;

export async function GET() {
    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { name } = body;

    users.push({name});

    return NextResponse.json(users);
}