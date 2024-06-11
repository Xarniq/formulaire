const Form = require('../models/form')

const registerForm = async (req,res) => {
    try {
        const {name,numberOfContractants,nameOfContractants } = req.body
        if (!name) {
            return res.json({
                error:"Name is required"
            })
        }
        if (!numberOfContractants){
            return res.json({
                error:"Need a number of contractants"
            })
        }
        if (!nameOfContractants) {
            return res.json({
                error:"Need at list one name"
            })
        }
        const exist = await Form.findOne({name})
        if (exist) {
            return res.json({
                error:"Name already taken"
            })
        }
        const form = await Form.create({
            name,
            numberOfContractants,
            nameOfContractants,
            
        }) 

    } catch (error) {
        console.log(error)
    }
}