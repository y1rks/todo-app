import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const SHOW_ALL_URL = "https://guarded-tundra-11745.herokuapp.com/api/showAll";
const REGISTER_URL = "http://localhost:3000/api/register";

type ShowAllResponse = {
  results: Item[];
};

type Item = {
  id: number;
  content: string;
};

function registerTodo(content: string) {
  fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  }).then((res) => {
    return res.json();
  });
}

async function fetchAllTodo(): Promise<ShowAllResponse> {
  const res = await fetch(SHOW_ALL_URL, { method: "GET" });

  return res.json() as unknown as ShowAllResponse;
}

const Todo: NextPage = () => {
  const [todos, setTodos] = useState([] as Item[]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const func = async () => {
      const res: ShowAllResponse = await fetchAllTodo();
      console.log("########");
      console.log("########");
      console.log(res.results);
      setTodos(res.results);
    };
    func();
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App</title>
      </Head>
      <h1>TODO</h1>
      <p>
        task:{" "}
        <input type="text" onChange={(e) => setContent(e.target.value)}></input>
      </p>
      <button onClick={() => registerTodo(content)}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>{todo.content}</p>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
