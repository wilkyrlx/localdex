import { useEffect, useState } from "react";
import Relationship from "../../../../types/Relationship";
import RelationshipListItem from "./RelationshipListItem";
import ContactInputBox from "../ContactInputBox";
import Contact from "../../../../types/Contact";
import dataManager from "../../../../util/DataManager";

// TODO: give it its own CSS
// FIXME: fix, does not work with new contacts
function RelationshipList({ activeContact, relationships, setRelationships }: { activeContact: Contact, relationships: Relationship[], setRelationships: Function }) {

    const id = activeContact?._id

    const [contactIDValue, setContactIDValue] = useState("");
    const [relationshipValue, setRelationshipValue] = useState("");

    useEffect(() => {
        setContactIDValue("")
        setRelationshipValue("")
    }, [relationships])

    useEffect(() => {
        const handleDataManagerChange = (newData: any) => {
            activeContact = newData.find((c: Contact) => c._id === id)
        };
        dataManager.subscribe(handleDataManagerChange);
        return () => {
            dataManager.unsubscribe(handleDataManagerChange);
        };
    }, []); 

    // TODO: very buggy, add error checking
    function addRelationship() {
        if (contactIDValue === "" || activeContact._id === undefined) {
            return;
        }
        const aNewRelationship = new Relationship(activeContact._id, contactIDValue, relationshipValue)
        const bNewRelationship = new Relationship(contactIDValue, activeContact._id, relationshipValue)

        const bContact = new Contact(dataManager.readContactFromId(contactIDValue))
        bContact.addRelationship(bNewRelationship)

        dataManager.updateContact(bContact)  
        setRelationships([...relationships, aNewRelationship])  
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