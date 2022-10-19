import React, { useState } from "react";
import { authPage } from "../../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../../components/Nav";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  /* Melakukan fetching data posts berdasarkan
  id yang ada di parameter */
  const { id } = ctx.query;

  // Karena ini di server maka kita menggunakan absolute url
  const postReq = await fetch("http://localhost:3000/api/posts/detail/" + id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const res = await postReq.json();

  console.log(res);

  return {
    props: {
      token,
      post: res.data,
    },
  };
}

export default function PostEdit(props) {
  const [status, setStatus] = useState("normal");

  const { post } = props;

  /**3. Membuat State */
  const [fields, setFields] = useState({
    title: post.title,
    content: post.content,
  });

  async function updateHandler(e) {
    /*
        *2. Fungsi e.prevenDevault untuk mencegah agar browser
        melakukan default nya yaitu loading*/
    e.preventDefault();

    setStatus("loading");

    const { token } = props;

    /**Mengirim data ke server melakukan pemanggilan api calls*/
    const update = await fetch(
      "http://localhost:3000/api/posts/update/" + post.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(fields),
      }
    );

    if (!update.ok) return setStatus("error");

    const res = await update.json();
    setStatus("success");
    Router.push("/posts");
  }

  function fieldHandler(e) {
    /** e.target(event target) =>digunakan untuk mengambil
        element input, karena element input direpresentasikan 
        dengan object target dalam event
     */
    const name = e.target.getAttribute("name");
    // console.log(name, e.target.value);

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>Edit Posts</h1>
      <Nav />
      <p>Post ID : {post.id}</p>

      {/* 1. Bikin Even Handlers untuk submit Form */}
      <form onSubmit={updateHandler.bind(this)}>
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="title"
          name="title"
          defaultValue={post.title}
        />
        <br />
        <textarea
          onChange={fieldHandler.bind(this)}
          placeholder="content"
          name="content"
          defaultValue={post.content}
        ></textarea>
        <br />
        <button type="submit">Save Change</button>
        <div>Status : {status}</div>
      </form>
    </div>
  );
}
