'use strict';

const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
  secret: 'Özel-Anahtar',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function (req, res) {

  if (req.session.goruntulenme) {

    req.session.goruntulenme++;

  } else {

    req.session.goruntulenme = 1;

  }

  res.send('Sayfa ' + req.session.goruntulenme + ' defa görüntülendi.');
  console.log(req.session);

});

app.get('/delete',(req,res,next)=>{
    req.session.destroy();
    res.redirect('/');
});

app.listen(1453, function () {
  console.log('Sunucu çalışıyor...');
});