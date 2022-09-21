import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Nav from './components/Nav.jsx';
import Cards from './components/Cards.jsx';

function App() {
  const [post, setPost] = useState([]);
  const key = process.env.REACT_APP_API_KEY;
  

    //Se solicita a la API la informacion para renderizarla
    useEffect(() => {
        axios
            .get(`https://dummyapi.io/data/v1/post`, {
                headers: {
                  "app-id": key
                }
              }
            )
            .then(response => {
                    const data = response.data.data
                    setPost(data)
            }).catch(console.log)
      }, [])
    
    //Segun la caracteristica escogida se realiza el filtrado, teniendo como por defecto la busqueda por nombre
    function onSearch(value, select) {
        /* if(!select || select === "name") {
            axios
                .get(`https://swapi.dev/api/people/?search=${value}`)
                .then(response => {
                    const data = response.data
                    setCharacters(data.results)
                    setData(data)
                }).catch(console.log)
        }
        if(select === "height") {
            let heightFilter = characters.filter(c => c.height === value);
            setCharacters(heightFilter);
        }
        if(select === "mass") {
            let massFilter = characters.filter(c => c.mass === value);
            setCharacters(massFilter);
        } */

    }
    
    return (
        <div>
            <Nav onSearch={onSearch}/>
            <hr />
            <Cards post={post} />
        </div>
    );
}

export default App;
