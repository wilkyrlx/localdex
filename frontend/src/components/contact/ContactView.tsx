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
        setMiscJsonValue(contact)
        console.log(contact)
    }

    const dummyJson = { test: "test", number: 6, array: [1, 2, 3], object: { a: "a", b: "b" }, float: 3.14, bool: true }

    const [fullNameValue, setFullNameValue] = useState("");
    const [notesValue, setNotesValue] = useState("");
    const [phoneNumberValue, setPhoneNumberValue] = useState("");
    const [relationshipsValue, setRelationshipsValue] = useState("");
    const [dateAddedValue, setDateAddedValue] = useState("");
    const [dateLastUpdatedValue, setDateLastUpdatedValue] = useState("");
    const [dateLastInteractedValue, setDateLastInteractedValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [miscJsonValue, setMiscJsonValue] = useState<object>(dummyJson);

    const test = {_id: 1000, test: "test from react 2"}


    function saveContact() {
        const date = new Date()
        const contact = {
            alias: [fullNameValue],
            personalEmail: emailValue,
            notes: notesValue,
            phoneNumber: phoneNumberValue,
            relationships: [relationshipsValue],
            dateAdded: date,
            dateLastUpdated: date,
            dateLastInteracted: date
        }
        fetch('http://localhost:8080/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
    }

    return (

        <div>
            <h1>Contact View</h1>
            <button onClick={() => loadRandomContact()}>Load Random Contact</button>
            <button onClick={() => saveContact()}>Save Contact</button>
            <ContactInputBox label={"Name"} textValue={fullNameValue} setValue={setFullNameValue} />
            <ContactInputBox label={"Notes"} textValue={notesValue} setValue={setNotesValue} />
            <ContactInputBox label={"Phone Number"} textValue={phoneNumberValue} setValue={setPhoneNumberValue} />
            <ContactInputBox label={"Relationships"} textValue={relationshipsValue} setValue={setRelationshipsValue} />
            <ContactInputBox label={"Email"} textValue={emailValue} setValue={setEmailValue} />
            <ContactInputBox label={"Date Added"} textValue={dateAddedValue} setValue={setDateAddedValue} />
            <ContactInputBox label={"Date Last Updated"} textValue={dateLastUpdatedValue} setValue={setDateLastUpdatedValue} />
            <ContactInputBox label={"Date Last Interacted"} textValue={dateLastInteractedValue} setValue={setDateLastInteractedValue} />
            <ReactJson src={miscJsonValue} name={false} displayDataTypes={false} collapsed={1} />
        </div>
    );
}

export default ContactView;