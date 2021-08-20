import React,{useState,useContext} from 'react'
import { useHttp } from './../hooks/http.hook';
import { AuthContext } from './../context/AuthContext';
import { useHistory } from 'react-router-dom';

export const CreatePage = ()=>
    {
        const history = useHistory()
        const auth = useContext(AuthContext)
        const {request} = useHttp()
        const [link, setLink] = useState('')
        const pressHandler =async event=>{
            if(event.key === 'Enter'){
                try {
                   const data = await request(
                    '/api/link/generate',
                    'POST',
                    {from:link},
                    {Authorization: `Bearer ${auth.token}`}
                    )
                   history.push(`/detail/${data.link._id}`)
                } catch (e) {
                    
                }
            }
        }
        return(
        <div>
            <input 
        id="link" 
        type="text" 
        value={link}
        placeholder="Вставьте ссылку" 
        className="inputStyle"
        onChange={e => setLink(e.target.value)}
        onKeyPress={pressHandler}
        />
        <label htmlFor="link">ссылка</label>
        </div>
    )}