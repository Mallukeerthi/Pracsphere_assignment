const mongoose = require("mongoose");

const uri = "mongodb+srv://245122737013_db_user:aYu22yhk6sEqfACS@cluster0.tpwdukj.mongodb.net/pracsphere?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection error:", err.message);
    process.exit(1);
  });
