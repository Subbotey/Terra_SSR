const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const pageRoutes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
});

const statOptions = {
  extensions: ['svg'],
};

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  name: 'sid',
  cookie: {
    httpOnly: true,
    maxAge: 60000,
  },
  resave: true,
  saveUninitialized: true,
}));
app.use(express.static('public', statOptions));
app.use(pageRoutes);

async function start() {
  try {
    await mongoose.connect('mongodb+srv://Subbotey:2TkyFs8vG@cluster0.h7mcs.mongodb.net/Terra', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log('Сервер запущен');
    });
  } catch (e) {
    console.log(e);
  }
}

start();
