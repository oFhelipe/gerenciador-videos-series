import { useState, useRef, useEffect } from 'react'

import './styles.css'

import PlayerBar from '../../components/PlayerBar'
import AppHeader from '../../components/AppHeader'

function Player() {
    const { remote } = window.require('electron');
    const player = useRef(null);
    const [fullscreen, setFullScreen] = useState(remote.getCurrentWindow().isFullScreen());
    const [play, setPlay] = useState(false);
    const [loaded, setLoaded] = useState(false);
    
    //<video> tambem usa essa função
    function handlePlay(){
        setPlay(!play)
    }

    useEffect(()=>{
        if(play){
            player.current.play()
        }
        else {
            player.current.pause()
        }
    },[play]);

    return (
        <div id="player-container">

            <AppHeader 
                isFullScreen={fullscreen}/>
            
            <video onClick={handlePlay} onLoadedData={()=>{setLoaded(true)}} ref={player} >
                    <source 
                        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                        type="video/mp4"/>
            </video> 
            
            {loaded &&
                <PlayerBar 
                    play={play}
                    fullscreen={fullscreen}
                    player={player.current}
                    handlePlay={handlePlay}
                    setFullScreen={setFullScreen}/>
            }
            
            
                   
        </div>
    );
}

export default Player
