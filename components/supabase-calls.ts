import supabaseClient from "@/utils/supabase";

export async function getTodo() {
  const { data } = await supabaseClient.from("todos").select("*");
  return data;
}

export async function createTodo(todo: string) {
  const { data } = await supabaseClient
    .from("todos")
    .insert({ todo })
    .select("*")
    .single();
  return data;
}

export async function deleteTodo(id: number) {
  const { data } = await supabaseClient
    .from("todos")
    .delete()
    .eq("id", id)
    .select("*")
    .single();
  return data;
}

export async function updateTodo(id: number, todo: string) {
  const { data } = await supabaseClient
    .from("todos")
    .update({ todo })
    .eq("id", id);
  return data;
}

export async function toggleEdit(edited: boolean, id: number) {
  const { data } = await supabaseClient
    .from("todos")
    .update({ edited })
    .eq("id", id)
    .select("*");
  return data;
}

export async function toggleCompleted(completed: boolean, id: number) {
  const { data } = await supabaseClient
    .from("todos")
    .update({ completed })
    .eq("id", id)
    .select("*");
  return data;
}
