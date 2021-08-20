import { useState, useCallback } from "react"
export const useHttp = () =>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback//чтобы не было рекурсии?!
    (async (url, method='GET', body = null, headers = {}) =>{
        setLoading(true)
        try{
            if(body){//если передаётся
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
        const response = await fetch(url,{method, body, headers})//fetch?
        const data = await response.json()

        if(!response.ok){
            var text = data.message
            let BeFirstError = false
            if(data.errors!== undefined){
                data.errors.forEach(element => {
                    if(!BeFirstError){
                        BeFirstError = true
                        text+= JSON.stringify(element.msg)
                    }
                    else
                        text+= ", " + JSON.stringify(element.msg)
                });
                
            }
            if(text.includes('undefined'))
                text = text.replace('undefined', '');
            throw new Error((text) || 'Что-то пошло не так :(')
        }
        setLoading(false)
        return data
        }
        catch(e){
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])

    const clearError = useCallback(() => setError(null),[])

    return {loading, request, error, clearError}
}