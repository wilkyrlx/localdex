import { useEffect, useState } from "react";
import Contact from "../types/Contact";
import DuplicateContactViewContainer from "../components/deduplicater/DuplicateContactViewContainer";
import dataManager from "../util/DataManager";

function HomePage() {


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
            <h1>Home</h1>
            <p>This is the home page</p>
            <DuplicateContactViewContainer contact1={contacts[0]} contact2={contacts[1]} />
        </div>
    );
}

export default HomePage;