import React, { useState, useEffect } from 'react';

interface NotificationMessage {
    payload: string;
    salt: number;
}

function createNotificationMessage(payload: string): NotificationMessage {
    return {
        payload,
        salt: Math.random()
    };
}


function NotificationBar({ message }: { message: NotificationMessage }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            console.log('NotificationBar message:', message);

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className={`notification ${isVisible ? 'notification-visible' : 'notification-hidden'}`}>
            {message.payload}
        </div>
    );
}

export default NotificationBar;
export type { NotificationMessage }
export { createNotificationMessage }
