import Container from '@/components/container';
import TodoItem from '@/components/todo-item';
import { Card } from '@/components/ui/card';

import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const FinishedPage = async () => {
    const getFinishedTasks = await prisma.todo.findMany({
        where: {
            isFinished: true
        }
    })

    return (
        <Container>
            <div className='space-y-5'>
                <div>
                    <h1 className="text-2xl font-semibold">Finished Tasks</h1>
                    <p className="font-medium">View your finished tasks.</p>
                </div>
                <Card className="p-5 space-y-5 bg-white shadow-md">
                    {getFinishedTasks.length > 0 ? (
                        getFinishedTasks.map((task) => (
                            <TodoItem key={task.id} data={task} />
                        ))
                    ) : (
                        <p className='font-medium text-center'>There are no tasks completed.</p>
                    )}
                </Card>
            </div>
        </Container>
    )
}

export default FinishedPage