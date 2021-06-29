'use strict';

const UtilService = require('../services/util.service');
const JwtService = require('../services/jwt.service');
const config = require('../config/config.json');

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
            ctx.body = await ctx.db.User.findAll({
                include: [
                    {
                        model: ctx.db.Department
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
            const user = await ctx.db.User.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: ctx.db.Department
                    }
                ]
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
                password, role
            } = ctx.request.body;

            if (!email) {
                ctx.throw(400, 'please provide the email');
            }
            if (!password) {
                ctx.throw(400, 'please provide the password');
            }
            const encryptedPassword = await UtilService.encryptPassword(password);

            if (!role) {
                // default role: user
                role = 1;
            }

            let emailExists = await module.exports.emailExists(ctx);
            if (emailExists) {
                ctx.throw(409, "email already used!");
            }
            
            if (phone) {
                let phoneExists = await module.exports.phoneExists(ctx);
                if (phoneExists) {     
                    ctx.throw(409, "phone already used!");
                }
            }

            ctx.body = await ctx.db.User.create({
                email: email,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                password: encryptedPassword,
                isActive: false,
                role: role
            });

        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async login(ctx) {
        try {
            let {email, password} = ctx.request.body;
            const expiresIn = '12h'
            if (!email) {
                ctx.throw(400, "please provide email");
            }
            if (!password) {
                ctx.throw(400, "please provide password");
            }
    
            const user = await module.exports.emailExists(ctx);
            if(!user){
                ctx.throw(410, "user not found");
            }

            const isMatched = await UtilService.comparePassword(password, user.password);
            if (isMatched) {
                const token = await JwtService.createToken({
                    payload: {
                        user: user.id
                    }
                }, config.development.expiresIn);

                ctx.body = {token};
            } else {
                ctx.throw(400, "invalid password");
            }

        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async modify(ctx) {
        try {
            let {
                email, firstname, lastname, phone, 
                password, isActive, role, DepartmentId
            } = ctx.request.body;
            const userEmailExists = await module.exports.emailExists(ctx);
            const userPhoneExists = await module.exports.phoneExists(ctx);
            if (userEmailExists && userEmailExists.id != ctx.params.id) {
                ctx.throw(409, "email already used!");
            }
            if (userPhoneExists && userPhoneExists.id != ctx.params.id) {
                ctx.throw(409, "phone already used!");
            }
            if (password) {
                password = await UtilService.encryptPassword(password);
            }

            ctx.body = await ctx.db.User.update({
                email: email,
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                password: password,
                isActive: isActive,
                role: role,
                DepartmentId: DepartmentId,
            }, {
                where: {
                    id: ctx.params.id
                }
            });
            
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
            }

            ctx.body = `deleted user with id ${id}`;
        } catch (err) {
            ctx.throw(500, err);
        }
    }
};