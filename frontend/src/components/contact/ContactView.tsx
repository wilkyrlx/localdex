import { Link } from "react-router-dom"
import Contact from "../../types/contact"
import { SetStateAction, useState } from "react"
import ContactInputBox from "./ContactInputBox"

function ContactView() {

    async function loadRandomContact() {
        const response = await fetch('http://localhost:8080/data')
        const data = await response.json()
        const contact: Contact = data[Math.floor(Math.random() * data.length)]
        setFullNameValue(contact.alias[0])
        setEmailValue(contact.personalEmail || "No email")
        console.log(contact)

    }

    const [fullNameValue, setFullNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");


    return (
        <div>
            <h1>Contact View</h1>
            <button onClick={() => loadRandomContact()}>Load Random Contact</button>
            <ContactInputBox label={"Name"} textValue={fullNameValue} setValue={setFullNameValue}/>
            <ContactInputBox label={"Email"} textValue={emailValue} setValue={setEmailValue}/>
        </div>
    );
}

export default ContactView;