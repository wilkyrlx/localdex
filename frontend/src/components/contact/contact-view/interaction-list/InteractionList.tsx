import { useState } from "react";
import InteractionListItem from "./InteractionListItem";

function InteractionList() {

    const [interactions, setInteractions] = useState([]);


    return (
        <div>
            Interaction List
            <ul className="interaction-list">
                { interactions.map((interaction) => <InteractionListItem interaction={interaction} /> ) }
            </ul>
        </div>
    )
}

export default InteractionList