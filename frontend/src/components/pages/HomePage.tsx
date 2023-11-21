import { useEffect, useState } from "react";
import Contact from "../../../../shared/types/Contact";
import { useMessageContext } from "../../AppContext";
import apiService from "../../api/apiService";
import DuplicateContactViewContainer from "../deduplicater/DuplicateContactViewContainer";

function HomePage() {

    const contact1 = {
        "_id": "1",
        "firstName": "John Doe"
    }

    const contact2 = {
        "_id": "2",
        "firstName": "Jane Doe"
    }

    // TODO: streamline this, maybe contact accessor function? proxy? singleton?

    const [contacts, setContacts] = useState<Contact[]>([contact1, contact2])

    async function loadData() {
        const data = await apiService.getData()
        setContacts(data)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <p>This is the home page</p>
            <DuplicateContactViewContainer contact1={contacts[0]} contact2={contacts[1]} />
        </div>
    );
}

export default HomePage;