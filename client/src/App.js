import { Route, Routes } from "react-router-dom";
import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import About from "./components/About/About"
import style from "./App.module.css"
import axios from 'axios';
axios.defaults.baseURL = 'https://videogamesapi2023-production.up.railway.app';

function App() {
  return (
    <div className={style.app}>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<Home key={"home"}/>}/>
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/formcreated" element={<Form/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;