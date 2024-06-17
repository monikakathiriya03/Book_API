const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const bookRoutes = require("./src/routes/book.routes");
const venderRoutes = require("./src/routes/vendor.routes");
const bookVenderRoutes = require("./src/routes/bookVendor.routes");

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", bookRoutes);
app.use("/api", venderRoutes);
app.use("/api", bookVenderRoutes);

app.listen(port, () => {
  async function main() {
    await mongoose.connect(process.env.MONGO_DB_URL);
  }
  main()
    .then(() => console.log("DB is connected..."))
    .catch((err) => console.log(err.message));

  console.log(`Server start at http://localhost:${port}`);
});
