import { authPage } from "../../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const postReq = await fetch("http://localhost:3000/api/posts", {
    headers: {
      Authorization: "Bearer" + token,
    },
  });

  const posts = await postReq.json();

  return {
    // ambil data saja, props nya dibikin object karena props: posts.data tadi array, jadi harus dijadikan object
    props: {
      posts: posts.data,
    },
  };
}

// Mengambil Props berikan argument props, props diakses disini
export default function PostIndex(props) {
  console.log(props);
  return (
    <div>
      <h1>Post Data</h1>

      {/* Untuk menulis kode javascript ekspresion di jsx kita 
      bisa menggunakan early braces  */}

      {/* Tidak memakai foreach jika foreach dia 
      tidak bisa memakai return  */}
      {props.posts.map((posts) => {
        return (
          // eslint-disable-next-line react/jsx-key
          /**
           * Untuk bikin elemen looping harus menggunakan
           * looping
           */
          <div key={posts.id}>
            {posts.title}
            {posts.content} - {posts.id}
          </div>
        );
      })}
    </div>
  );
}
