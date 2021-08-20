import React, { useEffect, useState, useContext }  from 'react'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from './../hooks/http.hook';
export const AuthPage = ()=>
    {
    const auth = useContext(AuthContext)
    const {loading, request, error} = useHttp()
    const [form, setForm] = useState({
        email:'', password:''
    })
    const [textError, setTextError] = useState("");
    useEffect(() => {
        setTextError(error)
    }, [error])

    const changeHandler = event =>{
        setForm({...form,[event.target.name]:event.target.value})
    }  
    const loginHandler =async () => {
        try {
            const data = await request('/api/auth/login', 'POST',{...form})
            auth.login(data.token, data.userId)
            setTextError("")
            alert('Вы успешно вошли в систему')
        } catch (e) {
        }
    }
    const registerHandler =async () => {
try {
    console.log("data 1")
    const data = await request('/api/auth/register', 'POST',{...form})
    setTextError("")
    console.log("data 2")
    console.log(data)
    alert(data.message)
} catch (e) {
    
}
    }
    
    return(
    <div className="blockBackground">
        <div className="error">{textError}</div>
        <br></br>
        <input 
        id="email" 
        type="email" 
        name="email" 
        value={form.email}
        placeholder="Введите email" 
        className="inputStyle"
        onChange={changeHandler}
        />
        <small>
            <label htmlFor="email">
                email
            </label>
        </small>
        <br></br>
        <input 
        id="password"
        type="password"
        name="password"
        value={form.password}
        placeholder="Введите пароль"
        className="inputStyle"
        onChange={changeHandler}
            />
        <small>
            <label htmlFor="password">
                пароль
            </label>
        </small>
        <br></br>
            <button type="submit" onClick={loginHandler} disabled={loading}>
                войти
            </button>
            <button type="submit" onClick={registerHandler} disabled={loading}>
                регистрация
            </button>
    </div>         
    )}