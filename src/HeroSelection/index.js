/* eslint-disable max-len */
/* eslint-disable import/no-duplicates */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UIFx from 'uifx';
import MainMenu from '../MainMenu';
import HeroSwiper from './HeroSwiper';
import ListOfHeroes from './ListOfHeroes';
import OneHero from './OneHero';
import '../css/App.css';
import '../css/HeroSelection.css';
import '../css/Cards.css';

import { sortedHeroesList, getCurrentPlayer } from '../rules';
import playSound from '../soundController';

const { message } = require('../constants');

// const clickSound1 = new UIFx(`${process.env.PUBLIC_URL}/sound/click.mp3`, { volume: 1.0 });
const clickSound2 = new UIFx(`${process.env.PUBLIC_URL}/sound/fin.mp3`, {
    volume: 1.0,
});

const Header = (props) => (
    <header className="main-header">
        <div className="hs-header-item">
            <div>{props.title}</div>
        </div>
        <div className="hs-header-item hs-header-item-centered">
            {props.centre}
        </div>
        <div className="hs-header-item">
            <div className="heroselection-playername">{props.playerName}</div>
        </div>
    </header>
);

class HeroSelection extends Component {
    constructor(props) {
        super(props);
        this.app = props.app;
        this.state = {
            hero: null,
        };
        this.select = this.select.bind(this);
        this.unselect = this.unselect.bind(this);
        this.play = this.play.bind(this);
    }

    select(heroID) {
        const hero = this.app.heroSelect.allHeroes[heroID];
        this.setState({ hero });
    }

    unselect() {
        this.setState({ hero: null });
    }

    play() {
    // console.log('PLAY MESSAGE SENT', this.state.hero);
        clickSound2.play();
        this.props.sendMessage({
            type: message.HEROSELECTED,
            hero: this.state.hero.id,
            player: this.app.heroSelect.activePlayer,
        });
        if (this.props.sendMessage && this.state.hero.id) {
            playSound(this.state.hero.id);
        }
    }

    heroesList() {
        return Object.values(sortedHeroesList(this.app));
    }

    renderOneHero() {
        const swiper = (
            <HeroSwiper
                hero={this.state.hero}
                allHeroes={this.heroesList()}
                select={this.select}
            />
        );
        return (
            <div className="main-container">
                <Header title="Character Details" centre={swiper} playerName={getCurrentPlayer(this.app)} />
                <OneHero
                    hero={this.state.hero}
                    unselect={this.unselect}
                    play={this.play}
                    isAvailable={this.app.heroSelect.heroes.includes(this.state.hero.id)}
                />
            </div>
        );
    }

    renderListOfHeroes() {
        return (
            <div className="main-container">
                <Header title="Select Character" playerName={getCurrentPlayer(this.app)} />
                <ListOfHeroes
                    heroesID={this.app.heroSelect.heroes}
                    allHeroes={this.heroesList()}
                    select={this.select}
                />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.state.hero ? this.renderOneHero() : this.renderListOfHeroes()}
                <MainMenu sendMessage={this.props.sendMessage} />
            </div>
        );
    }
}

HeroSelection.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    app: PropTypes.object.isRequired,
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    centre: PropTypes.object,
    playerName: PropTypes.string.isRequired,
};

Header.defaultProps = {
    centre: undefined,
};

export default HeroSelection;
