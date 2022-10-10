import db from "../../../../libs/db";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();
  const { id } = req.query;

  const auth = await authorization(req, res);

  console.log(req.query);
  const { title, content } = req.body;
  const update = await db("posts").where({ id }).update({
    title,
    content,
  });

  const updatedData = await db("posts").where({ id });
  console.log(updatedData);
  res.status(200);
  res.json({
    message: "Post Message Update Data",
    data: updatedData,
  });
}
