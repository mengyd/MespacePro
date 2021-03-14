'use strict';

module.exports = {

    titleExists: async function (ctx) {
        try {
            let title = ctx.request.body.title;
            const department = await ctx.db.Department.findOne({
                where: {
                    title
                }
            });
            return department;
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async findAll(ctx) {
        try {
            ctx.body = await ctx.db.Department.findAll({
                include: [
                    {
                        model: ctx.db.User
                    }
                ]
            });
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async findById(ctx) {
        try {
            const id = ctx.params.id;
            const department = await ctx.db.Department.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: ctx.db.User
                    }
                ]            
            });
            if(department) {
                ctx.body = department;
            } else {
                ctx.throw(410, "department not found");
            }
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async create(ctx) {
        try {
            let title = ctx.request.body.title;

            if (!title) {
                ctx.throw(400, 'please provide the title');
            }
    
            let titleExists = await module.exports.titleExists(ctx);
            if (titleExists) {
                ctx.throw(409, "department title already used");
            }

            ctx.body = await ctx.db.Department.create({
                title: title
            });

        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async modify(ctx) {
        try {
            let {title} = ctx.request.body;
            let id = ctx.params.id;
            const titleExists = await module.exports.titleExists(ctx);
            if(titleExists && titleExists.id != id){
                ctx.throw(409, "department title already used");
            }

            ctx.body = await ctx.db.Department.update({
                title: title
            }, {
                where: {
                    id: id
                }
            });
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async delete(ctx) {
        try {
            const id = ctx.params.id;
            const result = await ctx.db.Department.destroy({
                where: {
                    id
                }
            });
            if (result === 0) {
                ctx.throw(410, "department not found");
            }
            ctx.body = `deleted department with id ${id}`;
        } catch (err) {
            ctx.throw(500, err);
        }
    }

}