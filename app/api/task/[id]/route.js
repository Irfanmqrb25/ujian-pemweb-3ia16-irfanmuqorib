import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    const id = params.id;
    const parsedId = Number(id);
    const { taskName, action } = await req.json();

    if (!id) {
        return new Response("Task id is required", { status: 400 })
    }

    if (!taskName && action === "update") {
        return new Response("Task name is required", { status: 400 })
    }

    const existingTask = await prisma.todo.findUnique({
        where: {
            id: parsedId,
        },
    });

    if (!existingTask) {
        return new Response("Task not found", { status: 404 });
    }

    if (existingTask.isFinished && action === "update") {
        return new Response("Cannot update a finished task", { status: 400 });
    }

    if (action === 'finished') {
        try {
            const updateTask = await prisma.todo.update({
                where: {
                    id: parsedId
                },
                data: {
                    isFinished: true
                }
            })
            return NextResponse.json(updateTask)
        } catch (error) {
            console.log(error);
            return new Response("Failed to mark task as finished", { status: 500 })
        }
    } else if (action === 'update') {
        try {
            const updateTask = await prisma.todo.update({
                where: {
                    id: parsedId,
                },
                data: {
                    taskName,
                }
            })
            return NextResponse.json(updateTask)
        } catch (error) {
            console.log(error);
            return new Response("Failed to update task", { status: 500 })
        }
    } else {
        return new Response("Invalid action", { status: 400 })
    }
}

export async function DELETE(req, { params }) {
    const id = params.id;
    const parsedId = Number(id);

    if (!id) {
        return new Response("Task id is required", { status: 400 })
    }

    try {
        const deleteTask = await prisma.todo.delete({
            where: {
                id: parsedId
            }
        })

        return NextResponse.json(deleteTask)
    } catch (error) {
        console.log(error);
        return new Response("Failed to delete task", { status: 500 })
    }
}