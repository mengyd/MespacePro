const { Op } = require("sequelize");

module.exports = (app) => {
    const models = require("../models")(app);
    const User = models.User;

    function listAll(req, res) {
        res.type("json");
        User.findAll({}).then(users => {
            if (users) {
                res.json({msg: "OK", result: users});
            } else {
                res.json({msg: "XCP", result: "Unable to list the users"});
            }
        }).catch(err => {
            res.json({msg: "ERR", result: err});
        });
    }

    function create(req, res) {
        res.type("json");
        let email = req.body.email;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let phone = req.body.phone;
        let login = req.body.login;
        let password = req.body.password;
        let status = req.body.status;
        let role = req.body.role;

        const isUserUnique = email => 
            User.findOne({where: {
                email: email
                // [Op.or]: [
                //     { email: email },
                //     { login: login}
                // ]
            }}).then(
                result => result == null
                ).then(
                    isUnique => isUnique
                );

        if (isUserUnique === true) {
            User.create({
                email : email,
                firstname : firstname,
                lastname : lastname,
                phone : phone,
                login : login,
                password : password,
                status : status,
                role : role
            }).then(user => {
                if (user) {
                    res.json({msg: "OK", result: user});
                } else {
                    res.json({msg: "XCP", result: "Unable to create user"});
                }
            }).catch(err => {
                res.json({msg: "ERR", result: err});
            })
        } else {
            console.log("not unique");
            res.json({msg: "XCP", result: "User already existed"})
        }
        
    }

    return {listAll, create};
};