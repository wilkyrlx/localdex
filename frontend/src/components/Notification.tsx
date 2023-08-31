import React, { useState, useEffect } from 'react';

function Notification({ message } : { message: any }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // Set the timeout for how long the notification should be visible

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="notification">{message}</div> 
    );
}

export default Notification;
