import {BrowserRouter, Routes, Route} from 'react-router-dom'
import  AuthPage  from '../../pages/AuthPage.tsx'
import  GeolocationPage  from '../../pages/GeolocationPage.tsx'
import  AboutPage  from '../../pages/AboutPage.tsx'
import  ErrorPage  from '../../pages/ErrorPage.tsx'
import  RegistrPage  from '../../pages/RegistrPage.tsx'
import { Provider } from 'react-redux'
import { store } from '../../store/index'
import React from 'react';

// export const App = () => 
function  App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthPage/>}></Route>
                    <Route path="/geolocation" element={<GeolocationPage/>}></Route>
                    <Route path="/about" element={<AboutPage/>}></Route>
                    <Route path="/error" element={<ErrorPage/>}></Route>
                    <Route path="/registr" element={<RegistrPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    )  
}
export default App;