const express = require('express')
const config = require('config')
const bcrypt = require('bcryptjs')
const {check, validationResult}=require('express-validator')
const User = require('../models/User')
const router = express.Router()
const jwt =require('jsonwebtoken')
router.post('/register',
        [
            check('email', 'Некорректный email').isEmail(),
            check('password','Минимальная длина пароля 6 символов').isLength({min:6})
        ],
async function(req,res){
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message:'Ошибка при заполнении:'
            })
        }
        const {email, password} = req.body
        const BeUser = await User.findOne({email})//email = email: email
        if(BeUser){
            return res.status(400).json({
                message:`Пользователь с email ${email} уже существует`
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email,password:hashedPassword})
        await user.save()
        res.status(201).json({
            message:'Пользователь создан'
        })
    }catch(e){
        res.status(500).json({
            message:`Что-то пошло не так. Код ошибки: ${e}`
        })
    }
})
router.post('/login',
[
    check('email', 'Некорректный email').isEmail(),
    check('password','Введите пароль').exists()
], 
async function(req,res){
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message:'Ошибка при заполнении!'
            })
        }

        const {email, password} = req.body
        
        const user = await User.findOne({email})//email = email: email
        if(!user){
            return res.status(400).json({
                message:'Пароль или email не верны!'
            })
        }
        const passwordCorrect = await bcrypt.compare(password,user.password)
        if(!passwordCorrect){
            return res.status(400).json({message:'Пароль или email не верны!'})
        }
        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn:'1h'}//время действия токена
        )
        res.json({//status(200)
            userId:user.id,
            token
        })
    }catch(e){
        res.status(500).json({
            message:`Что-то пошло не так. Код ошибки: ${e}`
        })
    }
})
module.exports = router