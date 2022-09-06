const userModel =  require("../model/userModel")

const requireVerifier = async (request, response, next) => {
        if (request.userId) {
          var user = (await userModel.findById("USER_ID", request.userId))[0];
          if (user.USER_PROFILE_ID == 5) {
            next();
          } else {
            response.status(401).json({
              errors: {
                main: "Vous n'etes pas autorisé a se connecter",
              },
            });
          }
        }
      };

module.exports = requireVerifier