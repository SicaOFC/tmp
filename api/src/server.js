const express = require("express");
const cors = require("cors");
const routes = require("./routes.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${ process.env.PORT}`);
});
