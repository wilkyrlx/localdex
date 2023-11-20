import { useMessageContext } from "../../AppContext";
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

    return (
        <div>
            <h1>Home</h1>
            <p>This is the home page</p>
            <DuplicateContactViewContainer contact1={contact1} contact2={contact2} />
        </div>
    );
}

export default HomePage;