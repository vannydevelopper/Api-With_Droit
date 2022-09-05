const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")

const bindUser = require("./middleware/bindUser")
const userRouter = require("./routes/userRouter")
const verificationRouter = require("./routes/verificationRouter")
const historiqueRouter = require("./routes/historiqueRouter")
const historiqueStatusRouter = require("./routes/historiqueStatusRouter")
const requireAuth = require("./middleware/requireAuth")
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(fileUpload({
        createParentPath: true
      }));

app.all('*').use(bindUser)
app.use("/users",userRouter)
app.use("/verification",requireAuth, verificationRouter)
app.use("/historique", historiqueRouter)
app.use("/historiqueStatut", historiqueStatusRouter)


      const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log("server is running on port: "+ port);
});