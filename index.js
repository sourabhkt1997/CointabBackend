const express = require("express");
const db = require("./models");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8700;
app.use(express.json());
const cors = require("cors");
app.use(cors())
const {userrouter}=require("./controllers/userrouter")
const {User,Post}=require("./models")
app.use("/user",userrouter)

app.get("/",async(req,res)=>{
  try {
    res.status(200).send("welcome to cointab backend")
  } catch (error) {
    res.status(400).send(error)
  }
})


User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully.");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });



