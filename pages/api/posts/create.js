import db from "../../../libs/db";

export default async function handler(req, res) {
  // Logic Status jika req method !== 'POST' status 405 => http not allowed
  if (req.method !== "POST") return res.status(405).end();

  const { title, content } = JSON.parse(req.body);
  const create = await db("posts").insert({
    title,
    content,
  });

  const createdData = await db("posts").where("id", create).first();

  res.status(200);
  res.json({
    message: "Post Created Successfully",
    data: createdData,
  });
}
