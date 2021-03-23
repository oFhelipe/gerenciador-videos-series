import { useState, useEffect, useRef } from 'react'

import playIcon from '../../assets/images/playIcon.svg'
import pauseIcon from '../../assets/images/pauseIcon.svg'
import fullscreenIcon from '../../assets/images/fullscreenIcon.svg'
import unfullscreenIcon from '../../assets/images/unfullscreenIcon.svg'
import volumeIcon0 from '../../assets/images/volumeIcon0.svg'
import volumeIcon1 from '../../assets/images/volumeIcon1.svg'
import volumeIcon2 from '../../assets/images/volumeIcon2.svg'
import volumeIcon3 from '../../assets/images/volumeIcon3.svg'
import backSecIcon from '../../assets/images/backSecIcon.svg'
import frontSecIcon from '../../assets/images/frontSecIcon.svg'

import './styles.css'

function PlayerBar({play, fullscreen, player, handlePlay, setFullScreen}){
    const { remote } = window.require('electron');
    const [currentTime, setCurrentTime] = useState(player.currentTime);
    const [duration,] = useState(player.duration);
    const [volume, setVolume] = useState(player.volume);
    const [visivel, setVisivel] = useState(fullscreen);

    function changeFullScreen(){
       setFullScreen(!fullscreen);
    }

    function changeVolume({ target }){
        const { value } = target;
        setVolume(value);
        player.volume = value;
    }

    function volumeUp(){
        if(player.volume + 0.05 > 1){
            player.volume = 1;
        }
        else {
            player.volume = player.volume + 0.05;
        }
        setVolume(player.volume);
    }

    function volumeDown(){
        if(player.volume - 0.05 < 0){
            player.volume = 0;
        }
        else {
            player.volume = player.volume - 0.05;
        }
        setVolume(player.volume);
    }

    function seekTime({ target }){
        const { value } =  target;
        player.currentTime = value;
    }

    function setSecondsToTime(time){
        let hour = parseInt(time / 3600) <= 9 ? `0${parseInt(time / 3600)}` : parseInt(time / 3600);
        let minutes = parseInt(time / 60) <= 9 ? `0${parseInt(time / 60)}` : parseInt(time / 60);
        let seconds = (parseInt(time) % 60) <= 9 ? `0${(parseInt(time) % 60)}` : (parseInt(time) % 60)

        return `${hour}:${minutes}:${seconds}`
    }

    function frontSeconds(value){
        if(player.currentTime + value <= duration){
            player.currentTime = player.currentTime + value;
        }
        else {
            player.currentTime = duration;
        }
    }

    function backSeconds(value){
        if(player.currentTime - value > 0){
            player.currentTime = player.currentTime - value;
        }
        else {
            player.currentTime = 0;
        }
    }

    function setTime( { code } ){

        const functions = {
            ArrowLeft(){backSeconds(10)},
            ArrowRight(){frontSeconds(10)},
            ArrowUp(){volumeUp()},
            ArrowDown(){volumeDown()}, 
            Escape(){setFullScreen(false);remote.getCurrentWindow().setFullScreen(false);},
        }
        functions[code] && functions[code]();
    }
    useEffect(()=>{
        window.addEventListener('keydown', setTime, false);
        if(player){
            setInterval(()=>{setCurrentTime(player.currentTime)}, 900);
        }
    },[]);

    useEffect(()=>{
        if(fullscreen){
            remote.getCurrentWindow().setFullScreen(true);
            remote.getCurrentWindow().maximize();
            setVisivel(false);
        }
        else {
            remote.getCurrentWindow().setFullScreen(false);
        }
    },[fullscreen]);
   
    useEffect(()=>{
        var timeout;
        document.onmousemove = function(){
            setVisivel(true);
            clearTimeout(timeout);
            timeout = setTimeout(
                function(){
                    setVisivel(false);
                }
            , 3000);
        } 
    },[])


    return(
        <div className={`player-bar ${!fullscreen || !visivel && 'hide'}`}>

                <input 
                    type="range" 
                    min={0} 
                    max={duration} 
                    value={currentTime}
                    onChange={seekTime}/>

                <div id="player-buttons-container">

                    <div className="player-change-direction-space-itens">
                        <button className="player-button" onClick={handlePlay}>
                            {play 
                                ? <img alt="pause" src={pauseIcon}/>
                                : <img alt="play" src={playIcon}/>}
                        </button>
                        <p id="time-text">{setSecondsToTime(currentTime)} / {setSecondsToTime(duration)}</p>
                    </div>

                    <div className="player-change-direction-space-itens mid-player-icons">
                        <button onClick={()=>{backSeconds(10)}} className="player-button">
                            <img alt="back seconds" src={backSecIcon}/>
                        </button>
                        <button onClick={()=>{frontSeconds(10)}} className="player-button">
                            <img alt="front seconds" src={frontSecIcon}/>
                        </button>
                    </div>

                    <div className="player-change-direction-space-itens">

                        <button className="player-button" id="volume-container">
                            <div id="volume-box">
                                <input onChange={(e)=>{changeVolume(e)}} step={0.01} min={0} max={1} value={volume} type="range"/>
                            </div>   
                            <img alt="volume" src={volume > 0.66 ? volumeIcon3 : volume > 0.33 ? volumeIcon2 : volume === 0 ? volumeIcon0 : volumeIcon1}/>
                        </button>
                        
                        <button className="player-button" onClick={changeFullScreen}>
                            {fullscreen 
                                ? <img alt="unfullscreen"  src={unfullscreenIcon}/>
                                : <img alt="fullscreen" src={fullscreenIcon}/>}
                        </button>
                    </div>

                </div>
            </div> 
    );
}

export default PlayerBar;