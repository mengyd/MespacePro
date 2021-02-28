const models = require("../models");
const User = models.User;

module.exports = () => {
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

        User.findOne({
            where: {
                email: email
            }
        })
    }
}