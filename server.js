const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
global.__basedir = __dirname;

// Middleware
app.use(express.json());

// HTTP header สิทธ์การเข้าถึง
var corsOptions = {
    origin: '*'
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// Default Route
app.get('/',(req, res)=>{
    res.json({ message: 'Welcome to recipe Web!!'});
})

//require routes
require('./app/routes/user.rotes')(app);
require('./app/routes/recipe.routes')(app);
require('./app/routes/review.routes')(app);
require('./app/routes/ingredient.routes')(app);
require('./app/routes/region.routes')(app)
require('./app/routes/category.rotes')(app)
require('./app/routes/dashboard.rotes')(app)




//Port Server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('Server is running on port.'+PORT);
})