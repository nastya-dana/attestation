import { Link } from 'react-router-dom';
import React from 'react';

function ErrorPage() {
    return (
        <div style={{padding: "20px"}}>
            <Link to="/geolocation">← Назад</Link>
            <h1>Страница не найдена</h1>
        </div>
    )
}

export default ErrorPage;