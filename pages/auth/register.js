export default function Register() {
  function registerHandler(e) {
    e.preventDefault();
    console.log("Submit Form");
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerHandler.bind(this)}>
        <input type="text" placeholder="email" />
        <br />
        <input type="password" placeholder="password" />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
