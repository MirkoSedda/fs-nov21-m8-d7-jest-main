import app from "./app.js"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB")
  app.listen(3001, () => {
    console.log("Server is running on port 3001")
  })
})
