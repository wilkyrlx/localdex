import exp from "constants";
import { useState } from "react";

/**
 * Allows user to select a date between 1900 and today
 */
function DateSelector({ date, setDate }: { date: Date|undefined, setDate: Function }) {


    /**
     * @returns the current date in the format YYYY-MM-DD
     */
    function getMaxDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }

    /**
     * @param date the date to format (or undefined)
     * @returns the date in the format YYYY-MM-DD, or an empty string if date is undefined
     */
    const formatDate = (date: Date|undefined) => {
        if (!date) return "";
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return localDate.toISOString().split('T')[0];
    };

    return (
        <input type="date" value={formatDate(date)} min="1900-01-01" max={getMaxDate()} onChange={(e) => setDate(new Date(e.target.value))} />
    )
}

export default DateSelector;