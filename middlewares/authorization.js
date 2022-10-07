import jwt from "jsonwebtoken";

/* Membuat Abstraksi / middleware secara terpisah
 */

export default function authorization(req, res) {
  return new Promise((resolve, reject) => {
    // Buat proses authorization pengecekan header
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).end();

    const authSplit = authorization.split(" ");
    // console.log(authSplit);
    const [authType, authtoken] = [authSplit[0], authSplit[1]];

    //   Jika dia auth type nya bukan bearer dia tetap authorize
    if (authType !== "Bearer") return res.status(401).end();

    return jwt.verify(authtoken, "nonamanis", function (err, decoded) {
      {
        if (err) return res.status(401).end();
        return resolve(decoded);
      }
    });
  });
}
