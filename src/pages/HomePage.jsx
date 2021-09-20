import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import padlockClose from '../assets/padlockClose.svg';
import padlockOpen from '../assets/padlockOpen.svg';
import { Statistics } from '../components/Statistics';
import { Header } from '../components/Header';
import { getStatisticsUsers, setStatisticsUsers } from '../core/session';
import { Alert } from '../components/Alert';

export const HomePage = () => {
    const [time, setTime] = useState(60);
    const [start, setStart] = useState(false);
    const [classColorButton, setClassColorButton] = useState("gray");
    const [lockButton, setLockButton] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const { userLogged } = useSelector(state => state);
    const [blockButton, setBlockButton] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    useEffect(() => {
        !start && blockButton && setStatisticsUsers({
            userId: userLogged.user.id, buttonColor: classColorButton,
            timeCounter: time
        })
    }, [time, start])


    useEffect(() => {
        const currentUser = getStatisticsUsers() && getStatisticsUsers().find(user => user.userId === userLogged.user.id);
        if (currentUser) {
            setClassColorButton(currentUser.buttonColor);
            setTime(currentUser.timeCounter)
            setBlockButton(true);
            setShowTable(true);
        }
    }, [userLogged])

    useEffect(() => {
        if ((time >= 52 && time <= 61) && start) {
            setClassColorButton("purple");
        }
        start && setTimeout(() => {
            if (time >= 1) {
                setTime(time - 1);
            }
            setButtonColor()

        }, 1000);
    }, [start, time]);

    const setButtonColor = () => {

        if (time === 60) {
            setClassColorButton("gray");
        }
        if (time >= 52 && time <= 59) {
            setClassColorButton("purple");
        }
        if (time >= 42 && time <= 52) {
            setClassColorButton("blue");
        }
        if (time >= 32 && time <= 42) {
            setClassColorButton("green");
        }
        if (time >= 22 && time <= 32) {
            setClassColorButton("yellow");
        }
        if (time >= 12 && time <= 22) {
            setClassColorButton("orange");
        }
        if (time >= 0 && time <= 12) {
            setClassColorButton("red");
        }
    }


    const handleClickTime = () => {
        if (!lockButton && !blockButton) {
            setStart(!start);
            if (time === 0) {
                setTime(60);
            }
        } else {
            setShowAlert(!showAlert)

        }
        start && setShowTable(true);
        start && setBlockButton(!blockButton);
    }

    const textButton = !start ? "Start" : "Stop";

    const handleClickLockButtonTime = () => {
        setLockButton(!lockButton);
        setClassColorButton("white");
        lockButton && setButtonColor()
    }


    return (
        <div className="container-home">
            <Header />

            {showAlert && <Alert text="You can only click once" />}

            <div className={`CountdownCircleTimer border-counter-${classColorButton}`}>
                <div className={`timer-text text-counter-${classColorButton}`}>
                    <p >{`${time}s`}</p>
                </div>
            </div>

            <span
                type="button"
                className={`timer-button bg-${classColorButton}`}
                onClick={handleClickTime}
            >
                {
                    time === 0 ? "reset" : textButton
                }
            </span>

            <div
                type="button"
                className="lock-time-button"
                onClick={handleClickLockButtonTime}
            >
                {
                    !lockButton ?
                        <div>
                            <img src={padlockClose} alt="padlock-close" className="lock-time-img" />
                            <p className="text-padlock">Lock Timer</p>
                        </div>
                        :
                        <div>
                            <img src={padlockOpen} alt="padlock-open" className="lock-time-img" />
                            <p className="text-padlock">Unlock Timer</p>
                        </div>
                }
            </div>

            {showTable && <Statistics />}
        </div>
    )
}
