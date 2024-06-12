const express = require('express')
const router = express.Router()
const cors = require('cors')
const { test, registerUser, loginUser, getProfile} = require('../controllers/authController')
const { registerForm, testForm, getForms, deleteForm } = require('../controllers/formController')

// Middleware
router.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)

// Routes
router.get('/',test)
router.get('/profile', getProfile)
router.get('/testform', testForm)
router.get('/forms', getForms)
router.get('/forms/:id', getForms)
/* ----------------------------- */
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/registerform', registerForm)
router.put('/registerform/:id', registerForm)
router.delete('/deleteform/:id', deleteForm)



module.exports = router