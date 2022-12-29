const express =  require("express");
const app = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();

const routes = require("./src/routes/PasswordRoutes");

app.listen(process.env.PORT || 5000,()=> {
    console.log("Backend server is runnig!")
}); // OPEN    http://localhost:3000/verify

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/",routes);




