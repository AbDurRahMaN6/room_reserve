const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// database
const db = require("./models/authentication");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Database with { force: true }');
    initial();
});

// routes
// require('./app/routes/auth.routes')(app);
// require('./app/routes/user.routes')(app);
require('./routes/authentication/auth.routes')(app);
require('./routes/authentication/user.routes')(app);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "manager"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }
