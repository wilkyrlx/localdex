import { useEffect, useState } from "react";
import Contact from "../../types/Contact";
import DuplicateContactViewContainer from "../deduplicater/DuplicateContactViewContainer";
import dataManager, { useDataManagerEffect } from "../../util/DataManager";

function HomePage() {


    // TODO: streamline this, maybe contact accessor function? proxy? singleton?
    const [contacts, setContacts] = useState<Contact[]>(dataManager.contacts)

    useDataManagerEffect({ dataManager, setContacts });


    return (
        <div>
            <h1>Home</h1>
            <p>This is the home page</p>
            <DuplicateContactViewContainer contact1={contacts[0]} contact2={contacts[1]} />
        </div>
    );
}

export default HomePage;