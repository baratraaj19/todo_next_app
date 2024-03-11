"use client";
import { FormEvent, useEffect, useState } from "react";
import Card from "@/components/Card";
import { createTodo, getTodo } from "./supabase-calls";
import { Todos } from "@/utils/types";
import Button from "./Button";

export default function MainTodo() {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    (async () => {
      const data = await getTodo();
      if (data) {
        setTodos(data);
      }
    })();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (notes === "") {
      alert("Please enter notes");
      return;
    }
    const data = await createTodo(notes);
    setTodos((prev) => [data, ...prev]);
    setNotes("");
  };

  return (
    <main className='flex flex-col items-center justify-between py-9 '>
      <div className='flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='flex gap-4 pb-4 '>
          <input
            type='text'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder='Enter notes'
            className='w-full p-2 border'
          />
          <Button variant='add' className='w-full p-2'>
            Add
          </Button>
        </form>
      </div>
      <div className='flex flex-col gap-4 '>
        {todos.map((item) => (
          <Card key={item.id} item={item} setTodos={setTodos} />
        ))}
      </div>
    </main>
  );
}
