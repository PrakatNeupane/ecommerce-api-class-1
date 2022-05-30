import express from 'express'
import { newAdminValidation } from '../middlewares/joi-validation/adminValidation.js'
const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        status: "success",
        message: 'Get method hit to admin router'
    })
})

router.post('/', newAdminValidation, (req, res) => {
    console.log(req.body)
    res.json({
        status: "success",
        message: 'Post got hit to admin router',
    })
})

router.patch('/', (req, res) => {
    res.json({
        status: "success",
        message: 'Patch got hit to admin router',
    })
})

export default router;