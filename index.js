import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
