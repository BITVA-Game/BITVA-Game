import React from 'react';
import PropTypes from 'prop-types';
import './css/App.css';
import './css/VersusScreen.css';

import yaga from './images/heroes/yaga.jpg';
import morevna from './images/heroes/morevna.jpg';

const images = {
    yaga,
    morevna,
};

/* const renderHeroes = function (players) {
    players.forEach((p) => {
        <OneHero hero={p.hero} />;
    });
}; */

const OneHero = props => (
    <div className="versus-one-hero">
        <img src={images[props.hero]} alt={props.hero} />
    </div>
);

const VersusScreen = props => (
    <div className="versus-screen-container">
        <div className="versus-heroes-container">
            <OneHero hero={props.app.game.players[0].hero} />
            <div className="vs">
                <p>
                VS
                </p>
            </div>
            <OneHero hero={props.app.game.players[1].hero} />
        </div>
        <div className="play-button-container">
            <button className="play-button" type="button" onClick={() => props.sendMessage({ type: 'DEALALL' })}>
            PLAY
            </button>
        </div>
    </div>
);

VersusScreen.propTypes = {
    hero: PropTypes.string.isRequired,
    app: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
};

OneHero.propTypes = {
    hero: PropTypes.string.isRequired,
};

export default VersusScreen;
