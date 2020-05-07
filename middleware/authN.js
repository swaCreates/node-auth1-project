
function auth() {
	return async (req, res, next) => {
		const authError = {
			message: "You shall not pass",
		};

		try {
			// express-session will automatically get the session ID from the cookie
			// header, and check to make sure it's valid and the session for this user exists.
			if (!req.session || !req.session.user) {
				return res.status(401).json(authError);
			};

			next();
		} catch(err) {
			next(err);
		};
	};
};

module.exports = auth;