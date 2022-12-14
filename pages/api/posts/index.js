import db from "../../../libs/db";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  // Contoh Middleware -> meWmberikan filter incoming http request
  if (req.method !== "GET") return res.status(405).end();
  const auth = await authorization(req, res);

  //   Karena promise akan menjadi asynchronus
  const posts = await db("posts");
  //   console.log(posts);
  res.status(200);
  res.json({
    message: "Read Data",
    data: posts,
  });
}
