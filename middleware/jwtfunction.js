const jwt=require("jsonwebtoken");
const JWT_SECRET = '482d0829e5856b8340k3945p7487c5485x0940z';
module.exports = (req, res, next) => {

  let authHeader=req.headers.authorization;

  if(authHeader==undefined)
  {
    res.status(401).send({error:"no token provided"});
  }
  let token=authHeader.split(" ").pop()
  jwt.verify(token,JWT_SECRET,function(err,decoded){
    if(err){
      res.status(500).send({error:"Authentication Failed"})
    }
    else{
      req.isAuth = true;
      req.username = decoded.username;
      req.userData = decoded;
      return next();
    }

  })
}