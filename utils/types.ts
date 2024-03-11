export type Todos = {
  id: number;
  created_at: string;
  todo: string;
  completed: boolean;
  edited: boolean;
};

export type CardProps = {
  item: Todos;
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
};
