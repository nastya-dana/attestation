import { Button } from 'antd'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'

function RegistrPage() {
    const [login, setLogin] = useState("")
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")
    const [email, setEmail] = useState("")
    const [validation, setValidation] = useState("")

    const callBackendAPI = async () => {
        const response = await fetch('/regist', {
            method: 'POST',
            body: JSON.stringify({
                login: login,
                pass: pass,
                pass2: pass2,
                email: email
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

    const onRegist = () => {
        callBackendAPI()
            .then(res => {
                setValidation(res.data)
            })
            .catch(err => console.log(err));
    }

    return (<div style={{ padding: "20px" }}>
        <Link to="/">← Назад</Link><br />
        <div style={{ display: "flex", "alignItems": "center", "justifyContent": "center", "flexDirection": "column", gap: "10px" }}>
            <h2>Регистрация</h2>
            <form style={{ display: "flex", "flexDirection": "column", "alignItems": "flex-end" }}>
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
                <label>Повторный пароль:
                    <input
                        type="password"
                        value={pass2}
                        onChange={(e) => setPass2(e.target.value)}
                    />
                </label>
                <label>E-mail:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
            </form>
            <Button type="primary" onClick={onRegist}>Зарегистрироваться</Button>
            <p style={{ color: "Red" }}>{validation}</p>
        </div>
    </div>)
}

export default RegistrPage;