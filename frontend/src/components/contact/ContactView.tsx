import Contact from "../../../../shared/types/Contact"
import { useState } from "react"
import ContactInputBox from "./ContactInputBox"
import ReactJson from 'react-json-view'     // potential dependency issue, had to use --force to install


function ContactView() {

    async function loadRandomContact() {
        const response = await fetch('http://localhost:8080/data')
        const data = await response.json()
        const contact: Contact = data[Math.floor(Math.random() * data.length)]
        setFullNameValue(contact.alias[0])
        setEmailValue(contact.personalEmail || "No email")
        console.log(contact)
        setMiscJsonValue(data.stringify())
    }

    const [fullNameValue, setFullNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [miscJsonValue, setMiscJsonValue] = useState("");


    const dummyJson = {test: "test", number: 6, array: [1, 2, 3], object: {a: "a", b: "b"}, float: 3.14, bool: true}

    return (
        
        <div>
            <h1>Contact View</h1>
            <button onClick={() => loadRandomContact()}>Load Random Contact</button>
            <ContactInputBox label={"Name"} textValue={fullNameValue} setValue={setFullNameValue}/>
            <ContactInputBox label={"Email"} textValue={emailValue} setValue={setEmailValue}/>
            <ReactJson src={dummyJson} name={false} displayDataTypes={false} collapsed={1}/>
        </div>
    );
}

export default ContactView;