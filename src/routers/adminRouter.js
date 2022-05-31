import express from 'express'
import { encryptPassword } from '../../helpers/bcrypthelper.js'
import { insertAdmin, updateAdmin } from '../config/models/admin/Admin.model.js'
import { emailVerificationValidation, newAdminValidation } from '../middlewares/joi-validation/adminValidation.js'
const router = express.Router()
import { v4 as uuidv4 } from 'uuid';
import { sendMail } from '../../helpers/emailHelper.js'

router.get('/', (req, res) => {
    res.json({
        status: "success",
        message: 'Get method hit to admin router'
    })
})

router.post('/', newAdminValidation, async (req, res, next) => {
    try {
        // throw new Error("Checking errors")
        const hashPassword = encryptPassword(req.body.password)
        req.body.password = hashPassword

        // create unique email validation code
        req.body.emailValidationCode = uuidv4();

        const result = await insertAdmin(req.body) // sending to the database
        console.log(result)
        if (result?._id) {
            // create unique url and send it to the user email
            const url = `${process.env.ROOT_URL}/admin/verify-email/?c=${result.emailValidationCode}&e=${result.email}`
            // send email to user
            sendMail({ fName: result.fName, url })
            res.json({
                status: "success",
                message: 'New admin created succesfully',
            })
        }
        else {
            res.json({
                status: "error",
                message: 'Unable to create new admin. please try again later or contact the admin',
            })
        }

    } catch (error) {
        error.status = 500
        if (error.message.includes("E11000 duplicate key")) {
            error.message = "Email already exists"
            error.status = 200
        }
        next(error)
    }


})

// email verification router
router.post('/email-verification', emailVerificationValidation, async (req, res) => {
    console.log(req.body)
    const filter = req.body
    const update = { status: 'active' }

    const result = await updateAdmin(filter, update)
    console.log(result)

    result?._id ?
        res.json({
            status: 'success',
            message: "email successfully verified. You may login now"
        }) :
        res.json({
            status: 'error',
            message: "Invalid or expired verification link"
        })
})

router.patch('/', (req, res) => {
    res.json({
        status: "success",
        message: 'Patch got hit to admin router',
    })
})

export default router;