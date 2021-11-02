import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Todo.module.scss";

const SHOW_ALL_URL = "https://guarded-tundra-11745.herokuapp.com/api/showAll";
const REGISTER_URL = "https://guarded-tundra-11745.herokuapp.com/api/register";
const DELETE_URL = "https://guarded-tundra-11745.herokuapp.com/api/delete";

type ShowAllResponse = {
  results: Item[];
};

type Item = {
  id: number;
  content: string;
};

async function registerTodo(
  content: string,
  setTodos: Function,
  setContent: Function
) {
  try {
    const res = await fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });
    const allTodos: ShowAllResponse = await fetchAllTodo();
    setTodos(allTodos.results);
    setContent("");
    return res.json();
  } catch {
    return {};
  }
}

async function fetchAllTodo(): Promise<ShowAllResponse> {
  try {
    const res = await fetch(SHOW_ALL_URL, { method: "GET" });
    return res.json() as unknown as ShowAllResponse;
  } catch {
    return { results: [] };
  }
}

async function deleteTodo(id: number, setTodos: Function) {
  const url = new URL(DELETE_URL);
  url.searchParams.append("id", String(id));
  const res = await fetch(url.href, { method: "GET" });
  const allTodos: ShowAllResponse = await fetchAllTodo();
  setTodos(allTodos.results);
}

const Todo: NextPage = () => {
  const [todos, setTodos] = useState([] as Item[]);
  const [content, setContent] = useState("" as string);

  useEffect(() => {
    const func = async () => {
      const res: ShowAllResponse = await fetchAllTodo();
      setTodos(res.results);
    };
    func();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App</title>
      </Head>
      <h1>TODO</h1>
      <div className={styles.container__taskElement}>
        <p className={styles.container__taskText}>Task: </p>
        <input
          className={styles.container__taskInput}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <button onClick={() => registerTodo(content, setTodos, setContent)}>
          Add
        </button>
      </div>

      <ul className={styles.container__taskLists}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.container__taskList}>
            <button
              className={styles.container__taskListButton}
              onClick={() => {
                deleteTodo(todo.id, setTodos);
              }}
            >
              Delete
            </button>
            <p className={styles.container__taskListContent}>{todo.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
