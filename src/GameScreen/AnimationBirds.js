import React, { useState, useEffect } from 'react';
import playSound from '../soundController';

const Birds = () => {
    playSound('birds');
    return (
        <div className="animation-game-screen">
            <div className="bird-container bird-container-one">
                <div className="bird bird-one" />
            </div>
            <div className="bird-container bird-container-two">
                <div className="bird bird-two" />
            </div>
            <div className="bird-container bird-container-three">
                <div className="bird bird-three" />
            </div>
        </div>
    );
};

const BirdsAnimation = () => {
    // animation duration time
    const animationDuration = 9000;
    const [birdsAnim, setBirdsAnim] = useState(false);

    // min time delay to start animation
    // const minStart = 60000;
    const minStart = 20000;
    // max time delay to start animation
    // const maxStart = 180000;
    const maxStart = 60000;
    // random time delay to start animation between mmin and max values
    const animationStart = Math.floor(Math.random() * ((maxStart - minStart) + 1)) + minStart;

    // we change state after 1st render - didMount and birdsAnim === true to return BIRDS
    // after we call random delay there will be another re-render and we make birdsAnim = false
    // then we return birdsAnim == true with random delay
    useEffect(() => {
        if (birdsAnim === false) {
            setTimeout(() => {
                setBirdsAnim(true);
            }, animationStart);
        } if (birdsAnim === true) {
            setTimeout(() => {
                setBirdsAnim(false);
            }, animationDuration);
        }
    }, [birdsAnim]);

    const birdsAnimComp = birdsAnim
        ? (
            <Birds />
        ) : <div />;
    return birdsAnimComp;
};

export default BirdsAnimation;