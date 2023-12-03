"use client"

import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import axios from "axios";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const TaskForm = () => {
    const router = useRouter();
    const [taskName, setTaskName] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            await axios.post("/api/task/new", { taskName });
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
            setIsClicked(false)
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <Button
                className={cn(isClicked ? "bg-red-500 hover:bg-red-500/90" : "bg-brand hover:bg-brand/90", "self-start")}
                onClick={() => {
                    setTaskName("");
                    setIsClicked(!isClicked);
                }}
            >
                {isClicked ? "Cancel" : "Create Task"}
            </Button>
            {isClicked && (
                <form className="flex items-center gap-4" onSubmit={handleCreate}>
                    <Input placeholder="Task Name" className="focus-visible:ring-brand" onChange={(e) => setTaskName(e.target.value)} />
                    <Button
                        className="bg-brand hover:bg-brand/90"
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Create
                    </Button>
                </form>
            )}
        </div>
    )
}

export default TaskForm