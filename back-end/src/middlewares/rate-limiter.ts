import { ERROR_VI, RESULT, USER_ROLE } from '../types/enum'
import RateLimit from 'express-rate-limit'


const whitelistRoles = new Set([ USER_ROLE.ADMINISTRATOR, USER_ROLE.MODERATOR ])


function buildRateLimiter (options: {
    windowMs: number
    max: number
    skipFailedRequests?: boolean
}) {
    return RateLimit({
        windowMs: options.windowMs,
        max: options.max,
        skipFailedRequests: options.skipFailedRequests,
        message: ERROR_VI.TOO_MANY_REQUESTS,

        skip: (req, res) => (req.user && req.user.admin)!,

        handler: (request, response, next, options) =>
		    response.status(429).send({
                result: RESULT.fail,
                message: ERROR_VI.TOO_MANY_REQUESTS,
            }),
    })
}


export {
    buildRateLimiter
}
