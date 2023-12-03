"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from '../ui/input'
import { Button } from '../ui/button'

import axios from "axios";
import { Loader2 } from "lucide-react";

const EditForm = ({ data }) => {
    const router = useRouter();
    const [taskName, setTaskName] = useState(data.taskName);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.patch(`/api/task/${data.id}`, { action: "update", taskName });
            router.push("/");
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
            <Input
                placeholder="Task Name"
                className="focus-visible:ring-brand"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <Button
                className="bg-brand hover:bg-brand/90"
                disabled={isLoading}
            >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Update Task
            </Button>
        </form>
    )
}

export default EditForm