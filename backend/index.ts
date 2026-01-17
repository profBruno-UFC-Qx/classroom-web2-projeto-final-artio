import express from "express";
import router from "./routes";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server is running on  http://localhost:${process.env.PORT || 3000}`,
  );
});
