import db from "../../../libs/db";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  // Logic Status jika req method !== 'POST' status 405 => http not allowed
  if (req.method !== "POST") return res.status(405).end();

  const auth = await authorization(req, res);
  const { title, content } = req.body;
  const create = await db("posts").insert({
    title,
    content,
  });

  const createdData = await db("posts").where("id", create).first();

  //  test input data di terminal
  console.log(createdData);
  res.status(200);
  res.json({
    message: "Post Created Successfully",
    data: createdData,
  });
}
