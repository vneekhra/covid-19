const mongoose = require('mongoose');


//mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => { // for locathost
//mongoose.connect('mongodb://mongodb-server:27017/EmployeeDB', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => { //used in docker-compose file
mongoose.connect('mongodb://root:root@mongo/containercrushdb', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => { //used in cluster
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./employee.model');