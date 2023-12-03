"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Card } from './ui/card';
import { Button } from './ui/button';

import axios from "axios";
import { ClipboardList, Trash2, ClipboardEdit, ClipboardCheck } from "lucide-react";

const TodoItem = ({ data }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState();

    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            await axios.delete(`/api/task/${id}`);
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleFinished = async (e) => {
        setIsLoading(true);
        try {
            await axios.patch(`/api/task/${data.id}`, { action: 'finished' });
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="flex flex-col gap-4 p-4 text-white md:flex-row md:items-center md:justify-between bg-brand">
            <div className='flex items-center gap-2'>
                <ClipboardList />
                <h1 className="text-xl font-medium line-clamp-1">{data.taskName}</h1>
            </div>
            <div className='flex items-center space-x-3'>
                {data.isFinished !== true && (
                    <div className='flex items-center space-x-3'>
                        <Button
                            size="icon"
                            className="text-green-500 bg-white hover:bg-white hover:bg-white/90"
                            disabled={isLoading}
                            onClick={() => handleFinished(data.id)}
                        >
                            <ClipboardCheck size={20} />
                        </Button>
                        <Button
                            size="icon"
                            className="bg-white text-brand hover:bg-white hover:bg-white/90"
                            onClick={() => router.push(`/task/${data.id}`)}
                            disabled={isLoading}
                        >
                            <ClipboardEdit size={20} />
                        </Button>
                    </div>
                )}
                <Button
                    size="icon"
                    className="text-red-500 bg-white hover:bg-white/90"
                    disabled={isLoading}
                    onClick={() => handleDelete(data.id)}
                >
                    <Trash2 size={20} />
                </Button>
            </div>
        </Card>
    )
}

export default TodoItem