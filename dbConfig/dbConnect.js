const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/smartVote",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("connected to mongoDB...."))
    .catch((error) => console.error(error));