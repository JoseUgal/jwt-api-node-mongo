const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/maroDb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    })
    .then(db => console.log('DB is connected.'))
    .catch(err => console.log(err));