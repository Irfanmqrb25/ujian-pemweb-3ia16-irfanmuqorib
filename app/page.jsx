import { Card } from "@/components/ui/card";
import TaskForm from "@/components/form/task-form";
import TodoItem from "@/components/todo-item";
import Container from "@/components/container";

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic'


export default async function Home() {
  const getTask = await prisma.todo.findMany({
    where: {
      isFinished: false
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <Container>
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl font-semibold">Welcome to <span className="text-brand">Taskify.</span></h1>
          <p className="font-medium">Create your to-do list in an easy way.</p>
        </div>
        <div className="flex flex-col space-y-5">
          <TaskForm />
          <Card className="p-5 space-y-5 bg-white shadow-md">
            <h2 className="text-xl font-semibold">Your Tasks</h2>
            {getTask.length > 0 ? (
              getTask.map((task) => (
                <TodoItem key={task.id} data={task} />
              ))
            ) : (
              <p className="font-medium text-center">There are no tasks.</p>
            )}
          </Card>
        </div>
      </div>
    </Container>
  )
}
