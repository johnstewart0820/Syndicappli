import httpStatus from 'http-status';
import passport from 'passport';
import APIError from '../helpers/APIError';

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
    passport.authenticate('local', (err, user) => {
        if (err) {
            const error = new APIError('Authentication exception', httpStatus.INTERNAL_SERVER_ERROR, true);
            return next(error);
        }

        if (!user) {
            const error = new APIError('Bad username or password', httpStatus.UNAUTHORIZED, true);
            return next(error);
        }

        return res.json({
            token: user.generateJwt(),
            user: user.profile,
            permissions: user.permissions
        });
    })(req, res);
}

export default { login };
