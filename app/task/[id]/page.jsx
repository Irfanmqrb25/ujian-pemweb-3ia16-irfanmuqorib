import Container from '@/components/container'
import EditForm from '@/components/form/edit-task-form'
import prisma from '@/lib/prisma'

const EditPage = async ({ params }) => {
    const id = Number(params.id)
    const data = await prisma.todo.findUnique({
        where: {
            id
        }
    })

    return (
        <Container>
            <div className='space-y-5'>
                <h1 className="text-2xl font-semibold">Edit Task</h1>
                <EditForm data={data} />
            </div>
        </Container>
    )
}

export default EditPage