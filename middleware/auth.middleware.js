const jwt = require('jsonwebtoken')
const config = require('config')
module.exports = ( req, res, next)=>{
    if(req.method === 'OPTIONS'){//доступность сервера
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN" это строка с frontend
        if(!token){
            return res.status(401).json({message:'Нет авторизации'})
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'))//расшифровка токена
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message:'Нет авторизации'})
    }
}