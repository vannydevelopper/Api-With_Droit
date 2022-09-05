const requireAuth = (request, response, next) => {
        if (request.userId) {
                next();
        } else {
                response.status(401).json({
                        errors: {
                                main: "Connectez-vous mon grand",
                        },
                });
        }
};

module.exports = requireAuth;
