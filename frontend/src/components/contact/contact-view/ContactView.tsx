import Contact from "../../../../../shared/types/Contact"
import { useState } from "react"
import ContactInputBox from "./ContactInputBox"
// import ReactJson from 'react-json-view'     // potential dependency issue, had to use --force to install
import dotenv from 'dotenv'

function ContactView() {

    async function loadData() {
        const response = await fetch(process.env.REACT_APP_BACKEND_URI + '/data')
        const data = await response.json()
        console.log(data)
    }

    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [titleValue, setTitleValue] = useState("");
    const [notesValue, setNotesValue] = useState("");
    const [phoneNumberValue, setPhoneNumberValue] = useState("");
    const [relationshipsValue, setRelationshipsValue] = useState("");
    const [dateAddedValue, setDateAddedValue] = useState("");
    const [dateLastUpdatedValue, setDateLastUpdatedValue] = useState("");
    const [dateLastInteractedValue, setDateLastInteractedValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [miscJsonValue, setMiscJsonValue] = useState<object>({});


    function saveContact() {
        const date = new Date()
        const contact = {
            alias: [firstNameValue + " " + lastNameValue],
            firstName: firstNameValue,
            lastName: lastNameValue,
            personalEmail: emailValue,
            notes: notesValue,
            title: titleValue,
            phoneNumber: phoneNumberValue,
            relationships: [relationshipsValue],
            dateAdded: date,
            dateLastUpdated: date,
            dateLastInteracted: date
        }
        fetch(process.env.REACT_APP_BACKEND_URI + '/insertContact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        }).then(() => console.log("Contact added"))
    }

    return (

        <div>
            <h1>Contact View</h1>
            <button onClick={() => loadData()}>Load Random Contact</button>
            <button onClick={() => saveContact()}>Save Contact</button>
            <ContactInputBox label={"First Name"} textValue={firstNameValue} setValue={setFirstNameValue} />
            <ContactInputBox label={"Last Name"} textValue={lastNameValue} setValue={setLastNameValue} />
            <ContactInputBox label={"Notes"} textValue={notesValue} setValue={setNotesValue} />
            <ContactInputBox label={"Title"} textValue={titleValue} setValue={setTitleValue} />
            <ContactInputBox label={"Phone Number"} textValue={phoneNumberValue} setValue={setPhoneNumberValue} />
            <ContactInputBox label={"Relationships"} textValue={relationshipsValue} setValue={setRelationshipsValue} />
            <ContactInputBox label={"Email"} textValue={emailValue} setValue={setEmailValue} />
            <ContactInputBox label={"Date Added"} textValue={dateAddedValue} setValue={setDateAddedValue} />
            <ContactInputBox label={"Date Last Updated"} textValue={dateLastUpdatedValue} setValue={setDateLastUpdatedValue} />
            <ContactInputBox label={"Date Last Interacted"} textValue={dateLastInteractedValue} setValue={setDateLastInteractedValue} />
            {/* <ReactJson src={miscJsonValue} name={false} displayDataTypes={false} collapsed={1} /> */}
        </div>
    );
}

export default ContactView;