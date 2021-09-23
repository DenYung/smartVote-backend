const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const route = require('./routes/route');

//connect to mongoDB
require("./dbConfig/dbConnect");
require("./prod/Prod")(app);

//configure middlewares
app.use(cors());
app.use(express.json());
app.use("/api", route);


app.listen(PORT, () => console.log(`listening on port ${PORT}`))