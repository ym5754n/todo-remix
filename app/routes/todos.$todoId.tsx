import { Todo } from "@prisma/client";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(params.todoId),
    }
  });
  return json(todo);
}

export default function DetailTodo() {
  const todo: Todo = useLoaderData();

  return (
    <div id="todo">
      {todo.id}
      {todo.content}
    </div>
  );
}