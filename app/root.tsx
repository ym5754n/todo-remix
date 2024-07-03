import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";

import { json } from "@remix-run/node";
import type { Todo } from "@prisma/client";
import { prisma } from "~/lib/prisma.server";

export const loader = async () => {
  const todos = await prisma.todo.findMany();
  return json(todos);
}

export function Layout() {
  const todos: Todo[] = useLoaderData();

  return (
    <html lang="ja" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex w-full h-full">
        <div id="main" className="p-2 flex flex-1 flex-col w-full">
          <h1>ToDos</h1>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <Link to={`todos/${todo.id}`}>{todo.content}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div id="detail" className="p-2 flex w-48 bg-slate-200 border-l border-slate-300">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
