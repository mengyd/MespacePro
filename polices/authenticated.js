'use strict';

const JwtService = require('../services/jwt.service');

module.exports = async (ctx, next) => {
    let token = '';

    if(ctx.req.headers && ctx.req.headers.authorization){
        token = ctx.req.headers.authorization;
    } else{
        ctx.throw(401, 'authorization is missing in header');
    }

    const decodedToken = await JwtService.validToken(token);
    if (decodedToken.name === 'TokenExpiredError') {
        ctx.throw(401, "expired");
    }
    console.log(decodedToken);
    const user = await ctx.db.User.findOne({
        where: {
            id: decodedToken.payload.user
        }
    });

    if (user) {
        ctx.state.user = user.id;
        await next();
    } else {
        ctx.throw(401, 'Unauthorized');
    }
}