import { useRef, useState } from "react";
import Contact from "../../types/Contact";
import ContactView from "./contact-view/ContactView";
import { useMessageContext } from "../../AppContext";
import dataManager from "../../util/DataManager";

/**
 * BasicContactViewContainer holds the state for one ContactView component
 * ContactView is a form that holds contact data
 * 
 * Passes data through ref to parent via getContactFieldData()
 * 
 * @param activeContact - current contact to display, if any
 */
function BasicContactViewContainer({ activeContact }: { activeContact: Contact }) {

    // raw data from the ContactView component below
    const childRef: any  = useRef();

    const { setMessage } = useMessageContext();


    function handleDataFromChild(): Contact {
        const data = childRef.current?.getContactFieldData();
        console.log('Data received from child:', data);
        return data;
    }

    function syncContact() {
        const contact: Contact = handleDataFromChild()

        if(dataManager.contactExists(contact._id)) {
            dataManager.updateContact(contact)
            setMessage("Contact updated")
        } else {    
            dataManager.createContact(contact)
            setMessage("Contact added")
        }
    }
    
    

    return (
        <div>
            <h1>Simple Contact View</h1>
            <button onClick={ syncContact }>Sync Contact</button>
            <ContactView ref={childRef} activeContact={activeContact} />
        </div>
    );
}

export default BasicContactViewContainer;