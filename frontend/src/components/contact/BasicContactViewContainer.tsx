import { useRef, useState } from "react";
import Contact from "../../../../shared/types/Contact";
import ContactView from "./contact-view/ContactView";
import { useMessageContext, useReloadTriggerContext } from "../../AppContext";
import apiService from "../../api/apiService";

/**
 * BasicContactViewContainer holds the state for one ContactView component
 * ContactView is a form that holds contact data
 * 
 * Save and Update buttons call the apiService to save/update the contact
 * Passes data through ref to parent via getContactFieldData()
 * 
 * @param activeContact - current contact to display, if any
 */
function BasicContactViewContainer({ activeContact }: { activeContact?: Contact }) {

    // raw data from the ContactView component below
    const childRef: any  = useRef();

    const { setMessage } = useMessageContext();
    const { setReloadTrigger } = useReloadTriggerContext();


    function handleDataFromChild(): Contact {
        const data = childRef.current?.getContactFieldData();
        console.log('Data received from child:', data);
        return data;
    }

    function saveContact() {   
        const contact: Contact = handleDataFromChild()
        const date = new Date()
        contact['dateAdded'] = date
        contact['dateLastUpdated'] = date
        contact['source'] = "added manually"

        apiService.insertContact(contact)
        setMessage("Contact added")
        setReloadTrigger(Math.random())
    }

    function updateContact() {
        const contact: Contact = handleDataFromChild()
        const date = new Date()
        contact['dateLastUpdated'] = date

        apiService.updateContact(contact)
        setMessage("Contact updated")
        setReloadTrigger(Math.random())
    }
    
    

    return (
        <div>
            <h1>Simple Contact View</h1>
            <button onClick={ saveContact }>Save Contact</button>
            <button onClick={ updateContact }>Update Contact</button>
            <ContactView ref={childRef} activeContact={activeContact} />
        </div>
    );
}

export default BasicContactViewContainer;