import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb+srv://keerthyreddymallukeerthi_db_user:9BoEy4YhQZ68XsVT@cluster0.szsypd1.mongodb.net/pracsphere?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });
