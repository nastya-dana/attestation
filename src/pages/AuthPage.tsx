import { Button} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import React, {useState} from 'react'

function AuthPage() {
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate()

    const callBackendAPI = async () => {
        const response = await fetch('/login', {
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
                if (res.data.length === 0) {
                    alert('Неверный логин или пароль!')
                } else {
                    navigate('/geolocation')
                }

            })
            .catch(err => console.log(err));
    }

    return (<div style={{ padding: "20px" }}>
        <Link to="/registr">Регистрация</Link>
        <div style={{ display: "flex", "alignItems": "center", "justifyContent": "center", "flexDirection": "column", gap: "10px" }}>
            <h2>Авторизация</h2>
            <form style={{ display: "flex", "flexDirection": "column", "alignItems": "flex-end" }}>
                <label>Логин:
                    <input
                        name="login"
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </label>
                <label>Пароль:
                    <input
                        name="password"
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </label>
            </form>
            <Button id="button-login" type="primary" onClick={() => onLogin()}>Войти</Button>
        </div>
    </div>)
}

export default AuthPage;