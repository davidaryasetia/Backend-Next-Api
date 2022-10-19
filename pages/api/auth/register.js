import db from "../../../libs/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  /*
Jika data yang dikirim dalam bentuk application/json
maka data yang dikirim berbentuk string & string ndak bisa
di read
*/
  const { email, password } = req.body;
  //   test request body
  //   console.log({ email, password });

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const register = await db("users").insert({
    email,
    password: passwordHash,
  });

  const registeredUser = await db("users").where({ id: register }).first();

  //   test message registered user
  // console.log(registeredUser);
  res.status(200);
  res.json({
    message: "Message register Sucsessfully",
    data: registeredUser,
  });
}
