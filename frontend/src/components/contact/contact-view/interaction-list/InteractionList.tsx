import { useState } from "react";
import InteractionListItem from "./InteractionListItem";
import Interaction from "../../../../types/Interaction";

// TODO: pass in interactions as props
function InteractionList() {

    const interaction1 = new Interaction("test", "notes", new Date())

    const [interactions, setInteractions] = useState<Interaction[]>([interaction1]);


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