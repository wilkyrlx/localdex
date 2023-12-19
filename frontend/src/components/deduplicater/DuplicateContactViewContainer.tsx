import { useRef, useState } from "react";
import Contact from "../../types/Contact";
import ContactView from "../contact/contact-view/ContactView";
import { useMessageContext } from "../../AppContext";
import dataManager from "../../util/DataManager";

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
    const child1: any = useRef();
    const child2: any = useRef();

    const contact1Identifier = "Left Contact";
    const contact2Identifier = "Right Contact";

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
     */
    function mergeToLeft() {
        const contact: Contact = handleDataFromChild(child1)
        const contactToDelete = handleDataFromChild(child2)
        mergeContact(contact, contactToDelete)
    }

    /**
     * keeps the left contact and merges the right contact into it
     */
    function mergeToRight() {
        const contact: Contact = handleDataFromChild(child2)
        const contactToDelete = handleDataFromChild(child1)
        mergeContact(contact, contactToDelete)
    }
    
    function mergeContact(merger: Contact, deleted: Contact) {
        const date = new Date()
        merger['dateLastUpdated'] = date
        dataManager.updateContact(merger)
        dataManager.deleteContact(deleted)
        setMessage("Contact merged")
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