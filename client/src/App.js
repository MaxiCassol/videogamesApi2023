import { Route, Routes } from "react-router-dom";
import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import GameCreated from "./components/GameCreated/GameCreated";
import About from "./components/About/About"
import style from "./App.module.css"


function App() {
  return (
    <div className={style.app}>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<Home key={"home"}/>}/>
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/formcreated" element={<Form/>}/>
        <Route path="/created" element={<GameCreated/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;