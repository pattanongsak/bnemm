const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

require('dotenv/config');

app.use(cors());
app.options('*', cors());

const PORT = process.env.PORT || 5001;

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);



//Routers
const categoriesRouters = require('./routers/categories');
const productsRouters = require('./routers/products');
const usersRouters = require('./routers/users');
const ordersRouters = require('./routers/orders');


const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRouters);
app.use(`${api}/products`, productsRouters);
app.use(`${api}/users`, usersRouters);
app.use(`${api}/orders`, ordersRouters);




mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database Connection is ready...');
})
.catch((err) => {
    console.log(err);
})

app.listen(PORT, () => {
    console.log('server is running http://localhost:PORT');
})