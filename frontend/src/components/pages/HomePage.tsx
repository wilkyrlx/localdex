import { useMessageContext } from "../../AppContext";
import DuplicatePreview from "../deduplicater/DuplicatePreview";

function HomePage() {

    const contact1 = {
        "id": 1,
        "name": "John Doe"
    }

    const contact2 = {
        "id": 2,
        "name": "Jane Doe"
    }

    return (
        <div>
            <h1>Home</h1>
            <p>This is the home page</p>
            <DuplicatePreview contact1={contact1} contact2={contact2} />
        </div>
    );
}

export default HomePage;