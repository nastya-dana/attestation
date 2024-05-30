import { Link } from 'react-router-dom'

export const AboutPage = () => {
    return (
        <div style={{padding: "20px"}}>
            <Link to="/">← Назад</Link>
            <br/>
            <h2>Это сервис нужен для получения данных о загрязнении в населеном пункте</h2>
            <img src={require('../images/vidy141.jpg')} alt="photo1"/>
        </div>
    )
}