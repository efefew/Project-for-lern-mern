const express = require('express')
const Link = require('../models/Link')
const router = express.Router()
router.get('/:code',async(req,res)=>{
    try{
        const link = await Link.findOne({code:req.params.code})
        if(!link){
           return res.status(404).json({
                message:'Ссылка не найдена'
            })
        }
        link.clicks++ 
        await link.save()
        res.redirect(link.from)
    }catch(e){
        res.status(500).json({
            message:`Что-то пошло не так. Код ошибки: ${e}`
        })}
})
module.exports = router
