const roleChecker = (role) => (req, res, next) => {
    if(role.includes(req.user.role)){
      next();
    } else {
      return res.status(401).json({ message: 'You have no access.' });
    }
  };
  
  module.exports = roleChecker;