'use-strict';

module.exports = async (ctx, next) => {
    try {
        let user = await ctx.db.User.findOne({
            where: {
                id: ctx.state.user
            }
        });

        if (user.role < 2) {
            ctx.throw(401, 'Unauthorized');
        }

        await next();
        
    } catch (err) {
        ctx.throw(500, err);
    }

}