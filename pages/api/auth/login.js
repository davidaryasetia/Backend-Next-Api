import db from "../../../libs/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end;

  const { email, password } = req.body;

  const checkUser = await db("users").where({ email }).first();
  //   Check User jika datanya tidak ada
  //   console.log(checkUser);

  /*
  Check logic jika datanya tidak ada(undifined) maka
  akan unthorized
  status(401) => unthorized
  */
  if (!checkUser) return res.status(401).end();

  //   Bikin Pengecekan Bcrypt
  const checkPassword = await bcrypt.compare(password, checkUser.password);

  /*
  Check Logic jika password salah maka status(401) => authorized
  */
  if (!checkPassword) return res.status(401).end();

  // Proses Sign In Karena dia function synchronous jadi tidak perlu pakai await
  const token = jwt.sign(
    {
      id: checkUser.id,
      email: checkUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2 days",
    }
  );

  res.status(200);
  res.json({
    message: "Login Successfully",
    token,
  });
}
