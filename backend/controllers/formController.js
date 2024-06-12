const jwt = require('jsonwebtoken')
const Form = require('../models/form');

function getUser(token) {
    return jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) {
            return null;
        }
        return user
    });

}

const testForm = (req,res) => {
    res.json("test is working")
}

const registerForm = async (req, res) => {
    user = getUser(req.cookies["token"])
    try {
        const { name, numberOfContractants, nameOfContractants } = req.body;
        const userId = user.id 

        if (!name) {
            return res.json({
                error: "Name is required"
            });
        }
        if (!numberOfContractants) {
            return res.json({
                error: "Need a number of contractants"
            });
        }
        if (!nameOfContractants || nameOfContractants.length === 0) {
            return res.json({
                error: "Need at least one name"
            });
        }

        const exist = await Form.findOne({ name });
        if (exist) {
            return res.json({
                error: "Name already taken"
            });
        }

        const form = await Form.create({
            name,
            numberOfContractants,
            nameOfContractants,
            user: userId 
        });

        return res.status(201).json({
            message: "Form registered successfully",
            form
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

const getForms = async (req, res) => {
    user = getUser(req.cookies["token"])
    try {
        const userId = user.id;
        const forms = await Form.find({ user: userId });
        return res.json(forms);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

module.exports = {
    testForm,
    registerForm,
    getForms
}
