import { useState } from "react";
import InteractionListItem from "./InteractionListItem";
import Interaction from "../../../../../../shared/types/Interaction";

function InteractionList() {

    const [interactions, setInteractions] = useState<Interaction[]>([]);


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