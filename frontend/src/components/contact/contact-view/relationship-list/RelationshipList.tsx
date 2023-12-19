import { useEffect, useState } from "react";
import Relationship from "../../../../types/Relationship";
import RelationshipListItem from "./RelationshipListItem";
import ContactInputBox from "../ContactInputBox";

// TODO: give it its own CSS
function RelationshipList({ relationships, setRelationships }: { relationships: Relationship[], setRelationships: Function }) {

    const [contactIDValue, setContactIDValue] = useState("");
    const [relationshipValue, setRelationshipValue] = useState("");

    useEffect(() => {
        setContactIDValue("")
        setRelationshipValue("")
    }, [relationships])

    function addRelationship() {
        if (contactIDValue === "" || relationshipValue === "") {
            return;
        }
        const newRelationship = new Relationship(contactIDValue, relationshipValue)
        setRelationships([...relationships, newRelationship])
    }


    return (
        <div>
            <p>Relationship List</p>
            <ContactInputBox label={"Contact ID"} textValue={contactIDValue} setValue={setContactIDValue} />
            <ContactInputBox label={"Relationship"} textValue={relationshipValue} setValue={setRelationshipValue} />
            <button onClick={addRelationship}>Add Relationship</button>
            <ul className="interaction-list">
                { relationships.map((r) => <RelationshipListItem relationship={r} /> ) }
            </ul>
        </div>
    )
}

export default RelationshipList