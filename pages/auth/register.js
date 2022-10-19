import React, { useState } from "react";
import { unauthPages } from "../../middlewares/authorizationPage";

export async function getServerSideProps(ctx) {
  await unauthPages(ctx);

  return { props: {} };
}

export default function Register() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("normal");

  async function registerHandler(e) {
    e.preventDefault();

    setStatus("loading");

    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!registerReq.ok) return setStatus("error" + registerReq.status);

    const registerRes = await registerReq.json();

    setStatus("success");
    // console.log(registerRes);
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute("name");
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerHandler.bind(this)}>
        <input
          name="email"
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="email"
        />
        <br />
        <input
          name="password"
          onChange={fieldHandler.bind(this)}
          type="password"
          placeholder="password"
        />
        <br />
        <button type="submit">Register</button>

        <div>Output : {status}</div>
      </form>
    </div>
  );
}
