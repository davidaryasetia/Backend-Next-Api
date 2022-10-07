import db from "../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end;

  const posts = await db("posts");
  console.log(posts);
  res.status(200);
  res.json({
    message: "Read Data",
    data: posts,
  });
}
