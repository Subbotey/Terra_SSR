const Router = require('express');
const crypto = require('crypto');
const Users = require('../models/modelsUsers');
const Articles = require('../models/modelsArticles');
const ShortNews = require('../models/modelsShortNews');

const router = Router();

router.get('/', async (req, res) => {
  const autStatus = !!req.session.isAuthenticated;
  const shortNews = await ShortNews.find({}).lean();
  res.render('index', {
    title: 'Команда терраформинга',
    isIndex: true,
    shortNews,
    authorized: autStatus,
  });
});

router.get('/complete', (req, res) => {
  res.render('complete', {
    title: 'Набор закончен',
  });
});

router.get('/articles', async (req, res) => {
  const articles = await Articles.find({}).lean();
  const shortNews = await ShortNews.find({}).lean();
  const arr = {
    articles,
    shortNews,
  };
  const autStatus = !!req.session.isAuthenticated;
  res.render('articles', {
    title: 'Статьи',
    isArticles: true,
    arr,
    authorized: autStatus,
  });
});

router.get('/statement', async (req, res) => {
  const autStatus = !!req.session.isAuthenticated;
  const shortNews = await ShortNews.find({}).lean();
  const usersLength = await Users.find({}).lean();
  if (usersLength.length >= 12) {
    res.redirect('/complete');
  } else {
    res.render('statement', {
      title: 'Заявка',
      isStatement: true,
      shortNews,
      authorized: autStatus,
    });
  }
});

router.get('/crew', async (req, res) => {
  const autStatus = !!req.session.isAuthenticated;
  const users = await Users.find({}).lean();
  if (req.session.isAuthenticated) {
    res.render('crew', {
      title: 'Команда',
      isCrew: true,
      users,
      authorized: autStatus,
    });
  } else {
    res.redirect('/aut');
  }
});

router.post('/reg', async (req, res) => {
  const pass = crypto.createHmac('sha256', req.body.pwd).update('I love cupcakes').digest('hex');
  const users = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profession: req.body.profession,
    gender: req.body.gender,
    email: req.body.email,
    pwd: pass,
    img: req.body.img,
  });
  await users.save();
  req.session.isAuthenticated = true;
  res.redirect('/crew');
});

router.post('/in', async (req, res) => {
  const users = await Users.find({}).lean();
  const {
    email,
  } = req.body;
  let t = false;

  for (let i = 0; i < users.length; i++) {
    if (email === users[i].email) {
      const pass = crypto.createHmac('sha256', req.body.pwd).update('I love cupcakes').digest('hex');
      if (users[i].pwd === pass) {
        req.session.isAuthenticated = true;
        t = true;
        res.redirect('/success');
        break;
      } else {
        t = true;
        res.redirect('/errorpass');
        break;
      }
    }
  }
  if (t === false) {
    res.redirect('/erroremail');
  }
});

router.get('/success', (req, res) => {
  const autStatus = !!req.session.isAuthenticated;
  res.render('success', {
    title: 'Успешная авторизация',
    authorized: autStatus,
  });
});

router.get('/errorpass', (req, res) => {
  res.render('errorpass', {
    title: 'Пароль неверный',
  });
});

router.get('/erroremail', (req, res) => {
  res.render('erroremail', {
    title: 'Email неверный',
  });
});

router.get('/aut', (req, res) => {
  res.render('aut', {
    title: 'Авторизуйтесь',
  });
});

router.get('/out', (req, res) => {
  req.session.destroy();
  res.render('out', {
    title: 'Выход',
  });
});

module.exports = router;
