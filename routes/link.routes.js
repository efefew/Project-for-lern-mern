const config = require('config')
const shortid = require('shortid')
const express = require('express')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = express.Router()
router.post('/generate', auth, async(req,res)=>{
    try{
        const BaseUrl = config.get('baseUrl')
        const {from} = req.body//body - объект, поступающий на сервер
        const code = shortid.generate()
        const existing = await Link.findOne({from})

        if(existing){
            return res.json({link:existing})
        }

        const to = BaseUrl+"/t/"+code
        const link = new Link({
            from, to, code, owner: req.user.userId
        }) 

        await link.save()
        res.status(201).json({link})
    }catch(e){
        res.status(500).json({
            message:`Что-то пошло не так. Код ошибки: ${e}`
        })
    }
})

router.get('/',auth, async(req,res)=>{
    try{
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    }catch(e){
        res.status(500).json({
            message:`Что-то пошло не так. Код ошибки: ${e}`
        })
    }
})
router.get('/:id', auth, async(req,res)=>{
    try{
        const links = await Link.findById(req.params.id)
        res.json(links)
    }catch(e){
        res.status(500).json({
            message:`Что-то пошло не так. Код ошибки: ${e}`
        })
    }
})
module.exports = router