import { useActionData } from "react-router-dom";
import NotificationBar from "../NotificationBar";
import { useAppContext } from "../../AppContext";


function AboutPage() {

    const { message, setMessage } = useAppContext();

    return (
        <div>
            <h1>About</h1>
            <p>This is the about page</p>
        
            <button onClick={() => { setMessage(Math.random().toString(36).substring(7)); }}>Click me</button>
        </div>
    );
}

export default AboutPage;