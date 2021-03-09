module.exports = {
    async findAll(ctx) {
        try {
            ctx.body = await ctx.db.User.findAll();
            ctx.status = 200;
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async create(ctx) {
        try {
            ctx.body = await ctx.db.User.create({
                email: ctx.request.body.email,
                firstname: ctx.request.body.firstname,
                lastname: ctx.request.body.lastname,
                phone: ctx.request.body.phone,
                login: ctx.request.body.login,
                password: ctx.request.body.password,
                status: ctx.request.body.status,
                role: ctx.request.body.role
            });
            ctx.status = 200;
        } catch (err) {
            ctx.throw(500, err);
        }
    }
};