'use-strict';

module.exports = async (ctx, next) => {
    try {
        let user = await ctx.db.User.findOne({
            where: {
                id: ctx.state.user
            }
        });

        if (!user.isActive) {
            ctx.throw(401, 'not activated');
        }

        await next();
        
    } catch (err) {
        ctx.throw(500, err);
    }

}