import React, { useSelector, useEffect, useState, useRef } from 'react';
import Button from "@mui/material/Button";

const TimerButton = () => {

    const [timeLeft, setTimeLeft] = useState(60);
    const intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);
        return () => clearInterval(intervalRef.current);
        //console.log(timer)
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            clearInterval(intervalRef.current);
        }
    }, [timeLeft]);

    return (
        <div>
            <Button variant="contained" disabled>
                {timeLeft}s
            </Button>
            <Button variant="text" disabled>Resend OTP</Button>
        </div>
    );
}

export default TimerButton;