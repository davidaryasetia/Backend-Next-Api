import React, { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../components/Nav";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const postReq = await fetch("http://localhost:3000/api/posts/", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const posts = await postReq.json();

  return {
    // ambil data saja, props nya dibikin object karena props: posts.data tadi array, jadi harus dijadikan object
    props: {
      token,
      posts: posts.data,
    },
  };
}

// Mengambil Props berikan argument props, props diakses disini
export default function PostIndex(props) {
  const [posts, setPosts] = useState(props.posts);

  console.log(posts);

  async function deleteHandler(id, e) {
    e.preventDefault();

    console.log(props);

    /**token disini perlu kita ekstrak atau distructuring */
    const { token } = props;

    const ask = confirm("Apakah Data ini akan dihapus");

    if (ask) {
      const deletePost = await fetch("/api/posts/delete/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const res = await deletePost.json();

      /**
       * Kita akan menggunakan function filter, filter ini 
       bisa digunakan untuk melakukan filter di dalam array 
       karena data posts di format state type nya array
       */
      const postsFiltered = posts.filter((post) => {
        /* Logic :
        jadi di looping tersebut mengecek jika diantara id
        data tersebut idnya sama dengan id yang ingin di hapus 
        dia tidak boleh return 
        */
        return post.id !== id && post;
      });

      setPosts(postsFiltered);
    }
  }

  function editHandler(id) {
    Router.push("/posts/edit/" + id);
  }

  return (
    <div>
      <h1>Post Data</h1>
      <Nav />
      {/* Untuk menulis kode javascript ekspresion di jsx kita 
      bisa menggunakan early braces  */}

      {/* Tidak memakai foreach jika foreach dia 
      tidak bisa memakai return  */}
      {posts.map((posts) => {
        return (
          // eslint-disable-next-line react/jsx-key
          /**
           * Untuk bikin elemen looping harus menggunakan
           * looping
           */
          <div key={posts.id}>
            <h3>{posts.title}</h3>
            <p>{posts.content}</p>

            <div>
              {/* Bikin Handler Edit dan Delete untuk menampilkan prompt
              data ini akan dihapus
              lalu kita kasih parameter id posts.id*/}
              <button onClick={editHandler.bind(this, posts.id)}>Edit</button>
              <button onClick={deleteHandler.bind(this, posts.id)}>
                Delete
              </button>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
