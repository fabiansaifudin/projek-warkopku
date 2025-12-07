const bcrypt = require("bcryptjs");
const userServices = require("../services/auth.services");

/**
 * 1. To secure the password, we are using the bcryptjs, It stores the hashed password in the database.
 * 2. In the SignIn API, we are checking whether the assigned and retrieved passwords are the same or not using the bcrypt.compare() method.
 * 3. In the SignIn API, we set the JWT token expiration time. Token will be expired within the defined duration.
 */
exports.register = (req, res, next) => {
    userServices.register(req.body, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    });
};

exports.login = (req, res, next) => {
    const { username, password } = req.body;

    userServices.login({ username, password }, (error, results) => {
        if (error) {
          return next(error);
        }
        return res.status(200).send({
          message: "Success",
          data: results,
        });
    });
};

exports.resetPassword = (req, res, next) => {
  userServices.resetPassword(req, (error, results) => {
      if (error) {
        return next(error);
      }
      return res.status(200).send({
        message: "Success",
        data: results,
      });
  });
};

exports.checkResetPassword = (req, res, next) => {
  userServices.checkResetPassword(req, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.render('reset', { status: [] })
  })
}

exports.changeResetPassword = (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (confirmPassword != password) {
    return res.render('reset', { status: [400], message: "Password not same" })
    // return res.status(400).send({ message: "Password not same" })
  }

  const salt = bcrypt.genSaltSync(10);

  req.body.password = bcrypt.hashSync(password, salt);
  req.body.confirmPassword = req.body.password

  userServices.changeResetPassword(req, (error, results) => {
    if (error) {
      return next(error);
    }
    
    return res.render('reset', { status: [200], message: "Password has been change" })
  })
}

// exports.userProfile = (req, res, next) => {
//     // return res.status(200).json({ message: "Authorized User!!", data: req.header });
//     const { userId, email } = req.user;

//     userServices.profile(userId, (error, result) => {
//       if (error) {
//         return next(error);
//       }
//       return res.status(200).send({
//         message: "Success",
//         data: result
//       });
//     });
// };
// exports.role = (req, res, next) => {
//   userServices.role((error, result) => {
//       if (error) {
//           return next(error);
//       }
//       return res.status(200).send({
//           message: "Success",
//           data: result
//       });
//   })
// }

// exports.getRole = (req, res, next) => {
//   userServices.getRole(req.params.id, (error, result) => {
//       if (error) {
//           return next(error);
//       }
//       return res.status(200).send({
//           message: "Success",
//           data: result
//       });
//   })
// }