'use strict';

const UtilService = require('../services/util.service');

module.exports = {

    emailExists: async function (ctx) {
        try {
            let email = ctx.request.body.email;
            const user = await ctx.db.User.findOne({
                where: {
                    email
                }
            });
            return user;
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    phoneExists: async function (ctx) {
        try {
            let phone = ctx.request.body.phone;
            const user = await ctx.db.User.findOne({
                where: {
                    phone
                }
            });
            return user;
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async findAll(ctx) {
        try {
            ctx.body = await ctx.db.User.findAll();
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async findById(ctx) {
        try {
            const id = ctx.params.id;
            const user = await ctx.db.User.findOne({
                where: {
                    id
                }
            });
            if (user) {
                ctx.body = user;
            } else {
                ctx.throw(410, "user not found");
            }
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async signup(ctx) {
        try {
            let {
                email, firstname, lastname, phone, 
                password, status, role
            } = ctx.request.body;

            if (!email) {
                ctx.throw(400, 'please provide the email');
            }
            if (!password) {
                ctx.throw(400, 'please provide the password');
            }
            const encryptedPassword = await UtilService.encryptPassword(password);

            if (!status) {
                status = 'activated';
            }
            if (!role) {
                role = 'user';
            }

            let emailExists = await module.exports.emailExists(ctx);
            if (emailExists) {
                ctx.throw(409, "email already exists!");
            } 
            
            if (phone) {
                let phoneExists = await module.exports.phoneExists(ctx);
                if (phoneExists) {     
                    ctx.throw(409, "phone already exists!");
                }
            }

            ctx.body = await ctx.db.User.create({
                email: email,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                password: encryptedPassword,
                status: status,
                role: role
            });

        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async modify(ctx) {
        try {
            const userEmailExists = await module.exports.emailExists(ctx);
            const userPhoneExists = await module.exports.phoneExists(ctx);
            if (userEmailExists && userEmailExists.id != ctx.params.id) {
                ctx.throw(409, "email already exists!");
            } else if (userPhoneExists && userPhoneExists.id != ctx.params.id) {
                ctx.throw(409, "phone already exists!");
            } else {
                ctx.body = await ctx.db.User.update({
                    email: ctx.request.body.email,
                    firstname: ctx.request.body.firstname,
                    lastname: ctx.request.body.lastname,
                    phone: ctx.request.body.phone,
                    password: ctx.request.body.password,
                    status: ctx.request.body.status,
                    role: ctx.request.body.role
                }, {
                    where: {
                        id: ctx.params.id
                    }
                });
            }
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async deleteById(ctx) {
        try {
            const id = ctx.params.id;
            const result = await ctx.db.User.destroy({
                where: {
                    id
                }
            });

            if (result === 0) {
                ctx.throw(410, "user not found");
            } else {
                ctx.body = `deleted user with id ${id}`;
            }
        } catch (err) {
            ctx.throw(500, err);
        }
    }
};