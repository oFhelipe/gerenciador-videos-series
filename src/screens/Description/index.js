import { useEffect, useState } from 'react';
import api from '../../services/api'
import { Link } from 'react-router-dom'

import './styles.css'
import AppHeader from '../../components/AppHeader';

function Description(){
 
    const [about, setAbout] = useState("");
    const titles = 'Steven Universo';

    useEffect(()=>{

        api.get('', {
            params:{ titles }
        })
        .then((response)=>{
            const key = Object.keys(response.data.query.pages)[0];
            if(response.data.query.pages[key].extract){
                setAbout(response.data.query.pages[key].extract.replace(/(<([^>]+)>)/gi, ""));
            }
            else {
                setAbout("Nada encontrado no wikipedia com o nome de " + titles);
            }
            
        });
    },[]);

    return (
        <div id="desc-container">
            <AppHeader />
            <div id="desc-content-box">
                <div id="left-bar">
                    <img src="https://observatoriodocinema.uol.com.br/wp-content/uploads/2018/07/painel-steven-universe-decoracao.jpg"/>
                    <h1>{titles}</h1>
                    <h2>Sobre</h2>
                    <p>{about}</p>
                </div>
            </div>
        </div>
    )
}

export default Description;