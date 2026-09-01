import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/db/db-config.db.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT ?? 5000;

await connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("[ STARTING THE SERVER... ]");
      console.log(`[ SERVER IS RUNNING ON PORT: ${PORT} ]`);
    });
  })
  .catch((error) => {
    console.log(`[ DATABASE CONNECTION ERROR: ${error} ]`);
  });
