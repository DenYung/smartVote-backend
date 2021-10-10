const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const route = require('./routes/route');
const bodyParser = require("body-parser");

//connect to mongoDB
require("./dbConfig/dbConnect");
require("./prod/Prod")(app);

//configure middlewares


// Express 4.0
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors());
app.use(express.json());
app.use("/api", route);


app.listen(PORT, () => console.log(`listening on port ${PORT}`))