import { useEffect, useState } from "react";
import { Relationship } from "../../../../types/Relationship";
import RelationshipListItem from "./RelationshipListItem";
import ContactInputBox from "../reusable/ContactInputBox";
import Contact from "../../../../types/Contact";
import dataManager from "../../../../util/DataManager";

// TODO: give it its own CSS
// FIXME: fix, does not work with new contacts
function RelationshipList({ activeContact, relationships, setRelationships }: { activeContact: Contact, relationships: Relationship[], setRelationships: Function }) {

    const id = activeContact?._id

    const [contactIDValue, setContactIDValue] = useState<string|undefined>(undefined);
    const [relationshipValue, setRelationshipValue] = useState<string|undefined>(undefined);

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
        if (contactIDValue === undefined || activeContact._id === undefined) {
            return;
        }

        const aNewRelationship: Relationship = { contactSrc: activeContact._id, contactDest: contactIDValue, relationship: relationshipValue } 
        const bNewRelationship: Relationship = { contactSrc: contactIDValue, contactDest: activeContact._id, relationship: relationshipValue }

        const bContact = new Contact(dataManager.readContactFromId(contactIDValue))
        bContact.addRelationship(bNewRelationship)

        dataManager.updateContact(bContact)  
        setRelationships([...relationships, aNewRelationship])  
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