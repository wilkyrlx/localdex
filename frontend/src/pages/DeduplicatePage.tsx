import { useEffect, useState } from "react";
import Contact from "../types/Contact";
import DuplicateContactViewContainer from "../components/deduplicater/DuplicateContactViewContainer";
import dataManager from "../util/DataManager";

// FIXME: should this be called the action page? Deduplication may not be the only thing that happens on this page
// could add: CLI, CLI with LLM functionality, network mapper, etc
function DeduplicatePage() {


    // TODO: streamline this, maybe contact accessor function? proxy? singleton?
    const [contacts, setContacts] = useState<Contact[]>(dataManager.contacts)

    useEffect(() => {
        const handleDataManagerChange = (newData: any) => {
            setContacts(newData);
        };
        dataManager.subscribe(handleDataManagerChange);
        return () => {
            dataManager.unsubscribe(handleDataManagerChange);
        };
    }, []); 

    return (
        <div>
            <h1>Deduplication Page</h1>
            <DuplicateContactViewContainer contact1={contacts[0]} contact2={contacts[1]} />
        </div>
    );
}

export default DeduplicatePage;