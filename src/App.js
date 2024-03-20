import React from "react";
import Word_page from "./Components/Word_page";
import Para_page from "./Components/Para_page";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/React-Calculator" element={<Home />}></Route>
            <Route path="/wordpage" element={<Word_page />}></Route>
            <Route path="/parapage" element={<Para_page />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;