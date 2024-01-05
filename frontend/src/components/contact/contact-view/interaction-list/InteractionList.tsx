import { useEffect, useState } from "react";
import InteractionListItem from "./InteractionListItem";
import Interaction from "../../../../types/Interaction";
import ContactInputBox from "../reusable/ContactInputBox";

function InteractionList({ interactions, setInteractions }: { interactions: Interaction[], setInteractions: Function }) {

    const [interactionTitle, setInteractionTitle] = useState<string|undefined>("");
    const [interactionNotes, setInteractionNotes] = useState<string|undefined>("");

    useEffect(() => {
        setInteractionTitle("")
        setInteractionNotes("")
    }, [interactions])

    function addInteraction() {
        if (interactionTitle === "") {
            return;
        }
        const newInteraction: Interaction = {
            title: interactionTitle as string,
            notes: interactionNotes as string,
            date: new Date()
        }  // TODO: add date selector
        setInteractions([...interactions, newInteraction])
    }


    return (
        <div>
            <p>Interaction List</p>
            <ContactInputBox label={"Interaction Name"} textValue={interactionTitle} setValue={setInteractionTitle} />
            <ContactInputBox label={"Notes"} textValue={interactionNotes} setValue={setInteractionNotes} />
            <button onClick={addInteraction}>Add Interaction</button>
            <ul className="interaction-list">
                {interactions.map((interaction) => <InteractionListItem interaction={interaction} />)}
            </ul>
        </div>
    )
}

export default InteractionList