import React, { useState, useEffect } from 'react';

function NotificationBar({ message }: { message: string }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);

            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className={`notification ${isVisible ? 'notification-visible' : 'notification-hidden'}`}>
            {message}
        </div>
    );
}

export default NotificationBar;
