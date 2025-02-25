import {useDispatch} from "react-redux";
import {reset as resetPage} from "../redux/pageSlice";
import {reset as resetGame} from "../redux/gameSlice";
import {reset as resetPlayers} from "../redux/playersSlice";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import React, {useEffect, useState} from 'react';

const ResetFullGame = () => {
    const dispatch = useDispatch();
    const [isHolding, setIsHolding] = useState(false);
    const [holdTime, setHoldTime] = useState(0);
    const maxHoldTime = 10000;
    const [tooltipOpen, setTooltipOpen] = useState(false);

    useEffect(() => {
        let timer;
        if (isHolding) {
            timer = setInterval(() => {
                setHoldTime((prev) => prev + 100);
            }, 100);
        } else {
            setHoldTime(0);
        }
        if (holdTime >= maxHoldTime) {
            if (window.confirm('Нажмите OK для сброса текущей игры')) {
                resetFullGame();
            }
            setHoldTime(0);
        }
        return () => clearInterval(timer);
    }, [isHolding, holdTime]);

    const resetFullGame = () => {
        dispatch(resetGame());
        dispatch(resetPage());
        dispatch(resetPlayers());
    };

    return (
        <Tooltip
            title={`Держите кнопку ${maxHoldTime / 1000} секунд для сброса игры`}
            arrow
            open={tooltipOpen}
            onClose={() => setTooltipOpen(false)}
        >
            <span>
                <Button
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onMouseDown={() => setIsHolding(true)}
                    onMouseUp={() => setIsHolding(false)}
                    onMouseLeave={() => setIsHolding(false)}
                    onClick={() => setTooltipOpen(true)}
                    onTouchStart={() => setIsHolding(true)}
                    onTouchEnd={() => setIsHolding(false)}
                >
                    Начать заново
                </Button>
            </span>
        </Tooltip>
    );
};

export default ResetFullGame;
