import React, { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import Post from "./components/Post";

function App() {
  const url: string = "posts.json";
  const [text, setText] = useState("");

  type Post = {
    id: number;
    text: string;
  };

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function List() {
      axios
        .get(url)
        .then((res) => setPosts(res.data))
        .catch((error) => console.error(error));
    }

    List();
  }, []);

  async function Add(newPost: Post) {
    if (newPost != null) {
      const newPosts: Post[] = [...posts, newPost];
      axios
        .post(url, newPosts)
        .then((res) => setPosts(res.data))
        .catch((error) => console.error(error));
    }
  }

  async function Clear() {
    posts.map((post) => {
      axios
        .delete(url + post.id)
        .then((res) => setPosts(res.data))
        .catch((error) => console.error(error));
    });
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>SIMPLE BLOG</h1>
      </header>
      <div>
        <div className="container">
          <div className="text-box">
            <input
              type="text"
              placeholder="Write here..."
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></input>
            <button
              onClick={() => {
                const post: Post = {
                  id: 1,
                  text: text,
                };
                Add(post);
              }}
            >
              ENVIAR
            </button>
          </div>
        </div>
        <div className="container"></div>
        <div className="container">
          {posts.map((post) => (
            <div key={post.id}>{Post(post.text)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
