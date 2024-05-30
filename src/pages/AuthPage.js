import { Button} from 'antd'
import { Link } from 'react-router-dom'
import React, {useState} from 'react'

export const AuthPage = () => {
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")

    const callBackendAPI = async () => {
        const response = await fetch('/login',{
            method: 'POST',
            body: JSON.stringify({
                login: login,
                pass: pass
            }),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
        });
        const body = await response.json()

        if (response.status !== 200) {
        throw Error(body.message)
        }
        return body;
    };
  
  const onLogin = () => {
    callBackendAPI()
    .then(res => {
        if (res.data !== '') {
            alert(`${res.data}, вы успешно вошли!`)
        }
        
    })
    .catch(err => console.log(err));
  }

    return (<div style={{padding: "20px"}}> 
        <div style={{display: "flex", "justifyContent":"space-between"}}>
            <div style={{display: "flex", "gap": "15px", "marginBottom": "30px"}}>
                <Link to="/geolocation">Информация о загрязнениях</Link>
                <Link to="/about">О сервисе</Link>
                <Link to="/error">Страница 404</Link>
            </div>
            <Link to="/registr">Регистрация</Link>
        </div>
        <div style={{display: "flex", "alignItems":"center", "justifContent":"center", "flexDirection": "column", gap:"10px"}}>
            <h2>Авторизация</h2>
            <form style={{display: "flex", "flexDirection": "column", "alignItems": "flex-end"}}>
                <label>Логин:
                    <input
                    type="text" 
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    />
                </label>
                <label>Пароль:
                    <input
                    type="password" 
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    />
                </label>
            </form>
            <Button type="primary" onClick={() => onLogin()}>Войти</Button>
        </div>
    </div>)
}