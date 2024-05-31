import { Link } from 'react-router-dom'
import React from 'react'
// export const AboutPage = () => {
function AboutPage() {
    return (
        <div style={{padding: "20px"}}>
            <Link to="/geolocation">← Назад</Link>
            <br/>
            <h2>Это сервис нужен для получения данных о загрязнении в населеном пункте</h2>
            <img src={require('../images/vidy141.jpg')} alt="photo1"/>
        </div>
    )
}
export default AboutPage;