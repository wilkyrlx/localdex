import { useRef, useState } from "react";
import Contact from "../../../../shared/types/Contact";
import ContactView from "../contact/contact-view/ContactView";
import { useMessageContext, useReloadTriggerContext } from "../../AppContext";
import apiService from "../../api/apiService";

/**
 * DuplicateContactViewContainer holds the state for two ContactView components being compared
 * ContactView is a form that holds contact data
 * 
 * Passes data through ref to parent via getContactFieldData()
 * 
 * @param activeContact - current contact to display, if any
 */
function DuplicateContactViewContainer({ contact1, contact2 }: { contact1: Contact, contact2: Contact }) {

    // raw data from the ContactView components below
    const child1: any  = useRef();
    const child2: any  = useRef();

    const contact1Identifier = contact1.firstName || "Left Contact";
    const contact2Identifier = contact2.firstName || "Right Contact";

    const { setMessage } = useMessageContext();

    function handleDataFromChild(child: any): Contact {
        const data = child.current?.getContactFieldData();
        console.log('Data received from child:', child, data);
        return data;
    }


    function keepBoth() {
        // TODO: something
    }

    /**
     * keeps the left contact and merges the right contact into it
     * @param child 
     */
    function mergeToLeft() {
        const contact: Contact = handleDataFromChild(child1)
        mergeContact(contact)
        // TODO: delete contact2
        // setMessage("Contact updated")
    }

    function mergeToRight() {
        const contact: Contact = handleDataFromChild(child2)
        mergeContact(contact)
        // TODO: delete contact1
        // setMessage("Contact updated")
    }
    
    function mergeContact(contact: Contact) {
        const date = new Date()
        contact['dateLastUpdated'] = date
        apiService.updateContact(contact)
    }
    

    return (
        <div>
            <h1>Duplicate Contact View</h1>
            
            <button onClick={() => { console.log("TODO") }}>Keep Both</button>
            <button onClick={ mergeToLeft }>Merge to {contact1Identifier}</button>
            <button onClick={ mergeToRight }>Merge to {contact2Identifier}</button>

            <div className="half-page-container">
                <div className="scrollable-container" style={{ width: "50%", resize: "horizontal" }}>
                    {/* Left contact*/}
                    <ContactView activeContact={contact1} ref={child1}/>
                </div>
                <div className="scrollable-container" style={{ width: "50%", resize: "horizontal" }}>
                    {/* Right contact*/}
                    <ContactView activeContact={contact2} ref={child2}/>
                </div>
            </div>
        </div >
    );
}

export default DuplicateContactViewContainer;