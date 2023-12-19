import { useEffect, useState } from "react";
import Relationship from "../../../../types/Relationship";
import RelationshipListItem from "./RelationshipListItem";
import ContactInputBox from "../ContactInputBox";
import apiService from "../../../../util/apiService";
import Contact from "../../../../types/Contact";

// TODO: give it its own CSS
function RelationshipList({ activeContact, relationships, setRelationships }: { activeContact: Contact, relationships: Relationship[], setRelationships: Function }) {

    const [contactIDValue, setContactIDValue] = useState("");
    const [relationshipValue, setRelationshipValue] = useState("");

    useEffect(() => {
        setContactIDValue("")
        setRelationshipValue("")
    }, [relationships])

    // TODO: add relationship should add for both contact and target contact
    function addRelationship() {
        if (contactIDValue === "" || relationshipValue === "" || activeContact._id === undefined) {
            return;
        }
        const aNewRelationship = new Relationship(activeContact._id, contactIDValue, relationshipValue)
        const bNewRelationship = new Relationship(contactIDValue, activeContact._id, relationshipValue)
        setRelationships([...relationships, aNewRelationship])

        // FIXME: buggy mess, doesn't add just replaces
        const contact = new Contact({_id: contactIDValue, relationships: [bNewRelationship]})
        apiService.updateContact(contact)
    }


    return (
        <div>
            <hr></hr>
            <p>Relationship List</p>
            <ContactInputBox label={"Contact ID"} textValue={contactIDValue} setValue={setContactIDValue} />
            <ContactInputBox label={"Relationship"} textValue={relationshipValue} setValue={setRelationshipValue} />
            <button onClick={addRelationship}>Add Relationship</button>
            <ul className="interaction-list">
                { relationships.map((r) => <RelationshipListItem relationship={r} /> ) }
            </ul>
            <hr></hr>
        </div>
    )
}

export default RelationshipList