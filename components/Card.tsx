"use client";
import { CardProps, Todos } from "@/utils/types";
import React, { useState } from "react";
import { Check, CheckCheck, Pencil, Trash2 } from "lucide-react";
import {
  deleteTodo,
  toggleCompleted,
  toggleEdit,
  updateTodo,
} from "./supabase-calls";
import Button from "./Button";

const Card = ({ item, setTodos }: CardProps) => {
  const [edited, setEdited] = useState(item.edited);
  const [value, setValue] = useState(item.todo);

  return (
    <div className='flex bg-gray-200 p-3 gap-5 items-center justify-center w-96'>
      <div
        className={`flex flex-col items-center gap-3 ${
          item.completed ? "opacity-50 " : ""
        }`}>
        {edited ? (
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        ) : (
          <h1 className='w-96 px-4'>{item.todo}</h1>
        )}

        <div className='flex gap-3 items-center'>
          {edited ? (
            <Button
              variant='add'
              onClick={async () => {
                const data = await updateTodo(item.id, value);
                const data2 = await toggleEdit(false, item.id);
                setTodos((prev) => {
                  return prev.map((todo) => {
                    if (todo.id === item.id) {
                      return { ...todo, todo: value, edited: false };
                    }
                    return todo;
                  });
                });
                setEdited(false);
              }}>
              <Check />
            </Button>
          ) : (
            <Button
              variant='edit'
              onClick={async () => {
                const data = await toggleEdit(true, item.id);
                if (data) {
                  setTodos((prev) => {
                    return prev.map((todo) => {
                      if (todo.id === item.id) {
                        return { ...todo, edited: true };
                      }
                      return todo;
                    });
                  });
                  setEdited(true);
                }
              }}>
              <Pencil />
            </Button>
          )}
          <Button
            onClick={async () => {
              const data = await deleteTodo(item.id);
              if (data) {
                setTodos((prev) => prev.filter((todo) => todo.id !== item.id));
              } else {
                alert("unable to delete");
              }
            }}
            variant='delete'>
            <Trash2 />
          </Button>

          <Button
            variant='completed'
            onClick={async () => {
              // console.log("clicked", item.completed);
              const data = await toggleCompleted(
                item.completed ? false : true,
                item.id
              );
              if (data) {
                setTodos((prev) => {
                  return prev.map((todo) => {
                    if (todo.id === item.id) {
                      return {
                        ...todo,
                        completed: item.completed ? false : true,
                      };
                    }
                    return todo;
                  });
                });
              }
            }}>
            <CheckCheck />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
