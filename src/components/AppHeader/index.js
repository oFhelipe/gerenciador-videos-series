import { useState, memo, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import './styles.css'

import backIcon from '../../assets/images/backIcon.svg'

function AppHeader({ isFullScreen, title }){
    const { remote } = window.require('electron');
    const [maximized, setMaximized] = useState(remote.getCurrentWindow().isMaximized());
    const location = useLocation();
    const history = useHistory();

    function back(){
        remote.getCurrentWindow().setFullScreen(false);
        setMaximized(false);
        history.push('/');
    }
    
    function minimize(){
        remote.getCurrentWindow().minimize();
    }
    
    function close(){
        remote.getCurrentWindow().close();
    }

    function changeMaximized(){
        if(maximized){
            remote.getCurrentWindow().setFullScreen(false);
            remote.getCurrentWindow().unmaximize();
        }
        else {
            remote.getCurrentWindow().maximize();
        }
        setMaximized(!maximized);
    }
        useEffect(()=>{
            remote.getCurrentWindow().addListener('maximize', ()=>{setMaximized(true)});
            remote.getCurrentWindow().addListener('unmaximize', ()=>{setMaximized(false)});
        },[]);
    return (

        <header className={`header ${location.pathname == '/player' && 'player-header'} ${isFullScreen ? 'hide-header' : ''}`}>

        {
            location.pathname == '/player' || location.pathname == '/description'
            &&
            <div id="header-button-container">
                <Link onClick={back}  className={`header-button ${location.pathname == '/player' && 'header-button-player'}`}>
                    <img id="back-icon" src={backIcon}/>
                </Link>
            </div>
        }

         <div className={`mid-container ${!isFullScreen && 'dragable-area'}`}>

         </div>

        <div id="header-button-container">

            <button onClick={minimize} className={`header-button ${location.pathname == '/player' && 'header-button-player'}`}>
                <span id="line-icon" />
            </button>

            <button onClick={changeMaximized} className={`header-button ${location.pathname == '/player' && 'header-button-player'}`}>
                {maximized
                    ? <><span id="square-icon" className={`header-button ${location.pathname == '/player' && 'header-button-player'}`} />
                      <span id="square-icon" className={`header-button ${location.pathname == '/player' && 'header-button-player'}`} /></> 
                    : <span id="square-full-icon" />} 
            </button>

            <button onClick={close} className={`header-button ${location.pathname == '/player' && 'header-button-player'}`} id="x-box">
                <span id="x-left"/>
                <span id="x-right"/>
            </button>
        </div>

    </header>

    );
}

export default memo(AppHeader);