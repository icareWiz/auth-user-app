const express = require('express');
const dbCnx = require('./db/db');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
const app = express();
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const globalHandleError = require('./controllers/errorController');
const path = require('path');

const port = process.env.PORT || 7000;

dbCnx();

// body parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Set security HTTP headers
app.use(helmet());

app.use(cors({
    origin: 'https://auth-user-app-84eaef9ec7b6.herokuapp.com',
    credentials: true,
    optionsSuccessStatus: 200,
}));

// routes
app.use('/', routes);

app.use(express.static('client/build'));
app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})



app.use(globalHandleError);


app.listen(port, () => console.log(`App listen on ${port}`));
