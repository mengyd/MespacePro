'use strict';

const { create } = require("./department.controller");
const { modify } = require("./user.controller");

module.exports = {
    async findAll(ctx) {
        try {
            ctx.body = await ctx.db.Project.findAll({
                include: [
                    {
                        model: ctx.db.User,
                        as: 'members',
                        through: ctx.db.user_project
                    }
                ]
            });
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async create(ctx) {
        try {
            let {
                title, status, startDate, endDate
            } = ctx.request.body;

            if (!status) {
                status = 1;
            }

            ctx.body = await ctx.db.Project.create({
                title: title,
                status: status,
                startDate: startDate,
                endDate: endDate
            });

        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async modify(ctx) {
        try {
            let {
                title, status, startDate, endDate
            } = ctx.request.body;

            ctx.body = await ctx.db.Project.update({
                title: title,
                status: status,
                startDate: startDate,
                endDate: endDate
            }, {
                where: {
                    id: ctx.params.id
                }
            });

        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async addMember(ctx) {
        try {
            
        } catch (err) {
            ctx.throw(500, err);
        }
    }
}