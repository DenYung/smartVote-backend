const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

//connect to mongoDB
require("./dbConfig/dbConnect");

//configure middlewares
app.use(cors());
app.use(express.json());


app.listen(PORT, () => console.log(`listening on port ${PORT}`))