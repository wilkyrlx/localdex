import Contact from "../../../../../shared/types/Contact"
import { useEffect, useState } from "react"
import ContactInputBox from "./ContactInputBox"
// import ReactJson from 'react-json-view'     // potential dependency issue, had to use --force to install
import apiService from "../../../api/apiService"
import { useAppContext } from "../../../AppContext"

function ContactView({ activeContact }: { activeContact?: Contact }) {
    
    async function loadData() {
        const data = await apiService.getData()
        console.log(data)
    }

    const { setMessage } = useAppContext();

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

    // TODO: update all based on activeContact
    useEffect(() => {
        if (activeContact) {
            setFirstNameValue(activeContact.firstName || "")
            setLastNameValue(activeContact.lastName || "")
            setTitleValue(activeContact.title || "")
            setNotesValue(activeContact.notes || "")
            setPhoneNumberValue(activeContact.phoneNumber || "")
        }
    }, [activeContact]);



    async function saveContact() {
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
        const data = await apiService.insertContact(contact)
        setMessage("Contact added")
    }

    async function updateContact() {
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
        const data = await apiService.updateContact(contact)
        setMessage("Contact updated")
    }

    return (

        <div>
            <h1>Contact View</h1>
            <button onClick={() => loadData()}>Print All</button>
            <button onClick={() => saveContact()}>Save Contact</button>
            <button onClick={() => updateContact()}>Update Contact</button>
            <p>{activeContact?._id}</p>
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
            {/*
            TODO: find stable react-json-view dependency or similar
            <ReactJson src={miscJsonValue} name={false} displayDataTypes={false} collapsed={1} /> */}
        </div>
    );
}

export default ContactView;