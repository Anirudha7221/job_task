import React, { useState } from "react";
import './App.css';
import axios from "axios";

function App() {

    const [searchString, setSearchString]=useState();
    const [results, setResults]=useState([]);

    const handleSearch=async()=>{
        try {
          const responce=await axios.get(`http://localhost:3000/search?q=${searchString}`);
          setResults(responce.data);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div id='containeer'>
        <div id="searchbar">
            <input type="text" placeholder="Search" value={searchString} onChange={(e)=>{setSearchString(e.target.value)}}></input>
            <span class="material-symbols-outlined" onClick={handleSearch}>
                search
            </span>
        </div>
        
        <div id="section">
            {results.map((result, index)=>(
                <div key={index}>
                    <h3>{result.title}</h3>
                    <p>platform :{result.platform}</p>
                    <a href={result.link}>view</a>
                </div>
            ))}
        </div>
    </div>  
  );
}

export default App;