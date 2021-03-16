const jwt = require('jsonwebtoken');
const secret = 'D@!LyDoSe';

const createJWT = (obj) => {
  return jwt.sign(obj, process.env.SECRET || secret, { expiresIn: '1h' });
};

const authenticate = async (req, res, next) => {
  try {
    const bearer = await req.headers['authorization'];
    if (!bearer) return res.status(401).json({ message: 'Access Denied', statusCode: 401 });
    jwt.verify(bearer, process.env.SECRET || secret, (err, decode) => {
      if (res && decode !== undefined) {
        req.body.auth = decode;
        console.log(`decode : ${decode}`);
        next();
      } else res.status(401).json({ message: 'Access Denied', statusCode: 401 });
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Access Denied', statusCode: 401 });
  }
};

const permit = (...roles) => {
  return (req, res, next) => {
    const { role } = req.body.auth;
    if (roles.includes(role)) {
      next();
    } else {
      res.json({ message: 'no access to this route' });
    }
  };
};

module.exports = { createJWT, authenticate, permit };
