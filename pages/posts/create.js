import React, { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../components/Nav";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  return {
    props: {
      token,
    },
  };
}

export default function PostCreate(props) {
  /**3. Membuat State */
  const [fields, setFields] = useState({
    title: "",
    content: "",
  });

  const [status, setStatus] = useState("normal");

  async function createHandler(e) {
    /*
        *2. Fungsi e.prevenDevault untuk mencegah agar browser
        melakukan default nya yaitu loading*/
    e.preventDefault();
    setStatus("loading");
    const { token } = props;
    /**Mengirim data ke server melakukan pemanggilan api calls*/
    const create = await fetch("http://localhost:3000/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(fields),
    });

    if (!create.ok) return setStatus("error");

    const res = await create.json();
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
      <h1>Tambah Data</h1>
      <Nav />
      {/* 1. Bikin Even Handlers untuk submit Form */}
      <form onSubmit={createHandler.bind(this)}>
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="title"
          name="title"
        />
        <br />
        <textarea
          onChange={fieldHandler.bind(this)}
          placeholder="content"
          name="content"
        ></textarea>
        <br />
        <button type="submit">Create Post</button>
        <div>Status : {status}</div>
      </form>
    </div>
  );
}
