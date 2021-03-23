import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import Lottie from 'react-lottie'
import path from 'path'

import AppHeader from '../../components/AppHeader';

import emptyAnimation from '../../assets/animations/emptyAnimation.json'

const { remote } = window.require('electron');
const { app } = remote;
const fs = window.require('fs');


function Home(){
 
    const documents = app.getPath('documents');

    const [series, setSeries] = useState([]);

    useEffect(()=>{
    
        //inicializando pasta do programa
        if(!fs.existsSync(`${documents}\\video-player`)){
            fs.mkdirSync(`${documents}\\video-player`);
        }
 
        //buscando todas as séries
        setSeries(fs.readdirSync(`${documents}\\video-player`));

    },[]);
     
    return (
        <div id="home-container">
            <AppHeader />
            <div id="title-box">
                <p>Minha biblioteca</p>
            </div>
            <div id="library-container">
                {
                    series.length > 0 
                    ? series.map((serie)=>{
                        return (
                            <Link to="/description" id="album-box">
                                <img src="https://ca-times.brightspotcdn.com/dims4/default/cf9ce38/2147483647/strip/true/crop/1024x768+0+0/resize/840x630!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F9e%2F02%2Fbdbd67c6685b89f4a58d9abf7287%2Fla-et-st-steven-universe-20131104-001"/>
                                    <div>
                                        <p>Steven universe</p>
                                    </div>
                            </Link>
                        );
                    })
                    : <div id="nothing-container">

                            <div>
                                <Lottie options={{
                                    autoplay:true,
                                    loop:true,
                                    animationData:emptyAnimation
                                }}/>
                            </div>
                            <h1>OPS...</h1>
                            <h1>Nada encontrado</h1>
                            <p>Insira uma pasta em meus documentos para começar!!</p>
                      </div>

                }
            </div>
        </div>
    );
}

export default Home;