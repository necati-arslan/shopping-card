var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Order = require('../models/order');
var Cart = require('../models/cart')

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function (req, res, next) {
  Order.find({user: req.user}, function(err, orders) {
      if (err) {
          return res.write('Error!');
      }
    
      var cart;
      orders.forEach(function(order) {// order=orders tır. order üzerinde yapılan her türlü deşiklik orderı etkiler
        
          cart = new Cart(order.cart);
          order.items = cart.generateArray();
          console.log(order.items);
      });
     
      //console.log(typeof(orders));
      res.render('user/profile', { orders: orders });
  });
});

router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logout();
  res.redirect('/');
}); 


router.use('/', notLoggedIn, function (req, res, next) {
  next();
});



router.get('/signup', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages : messages , hasErrors: messages.length > 0 });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect:'/user/profile',
  failureRedirect: '/user/signup',
 failureFlash: true
 }));



router.get('/signin', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
  failureRedirect: '/user/signin',
 failureFlash: true
 }), function (req, res, next) {
    if (req.session.oldUrl) {
         var oldUrl = req.session.oldUrl;
         req.session.oldUrl = null;
         res.redirect(oldUrl);
     } else {
         res.redirect('/user/profile');
     }
   });
 







module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
      return next();
  }
  res.redirect('/');
}