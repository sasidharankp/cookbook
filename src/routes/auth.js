import express from 'express';
const router = express.Router();

import passport from 'passport';

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user){
    res.render('index', { title: 'Cookbook Backend' ,username:req.user.username});
  }else{
    res.render('loggedOut');
  }
});

router.get("/login", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

router.get('/user',(req, res)=>{
  if(req.user){
    res.json({username:req.user.username})
  }
  else{res.json({
    Error: "Please Log In"
})}
})

router.get('/callback',passport.authenticate('google',{
  successRedirect: '/',
  failureRedirect: '/'
}))

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect('/');
});

export default router;
