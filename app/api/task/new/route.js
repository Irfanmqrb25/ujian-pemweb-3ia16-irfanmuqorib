import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { taskName } = await req.json();

    if (!taskName) {
        return new Response("Task name is required", { status: 400 });
    }

    try {
        const createTask = await prisma.todo.create({
            data: {
                taskName: taskName
            }
        })

        return NextResponse.json(createTask)
    } catch (error) {
        console.log(error.message);
        return new Response("Failed to create task", { status: 500 });
    }
}