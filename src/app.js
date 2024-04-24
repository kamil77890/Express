import express from "express";
import "dotenv/config";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/healthcheck", (req, res) => {
  res
    .status(200)
    .json({ message: "Server is running!", timestamp: Date.now() });
});

app.post("/", (req, res) => {
  const { body, query, params } = req;
  const { id } = params;
  res.status(200).json({ body, query, id });
});

app.listen(process.env.PORT || 8080, function () {
  const { port } = this.address();
  console.log(`Server is listening on port ${port}`);
});
