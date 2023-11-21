import Contact from "../../../../../shared/types/Contact"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import ContactInputBox from "./ContactInputBox"
import JsonView from '@uiw/react-json-view';
import InteractionList from "./interaction-list/InteractionList";


const ContactView =  forwardRef<any, any>((props, ref) => {
    const { activeContact } = props;
   
    useImperativeHandle(ref, () => ({ getContactFieldData }));

    const [firstNameValue, setFirstNameValue] = useState<string>("");
    const [lastNameValue, setLastNameValue] = useState<string>("");
    const [photoUriValue, setPhotoUriValue] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string>("");
    const [notesValue, setNotesValue] = useState<string>("");
    const [birthdayValue, setBirthdayValue] = useState<Date | undefined>(undefined);
    
    const [addressValue, setAddressValue] = useState<string>(""); // TODO: change to Address
    const [formerAddressesValue, setFormerAddressesValue] = useState<string>(""); // TODO: change to Address
    
    const [primaryPhoneValue, setPrimaryPhoneValue] = useState("");     // TODO: change to Phone
    const [alternatePhone, setAlternatePhone] = useState("");           // TODO: change to Phone

    const [personalEmailValue, setPersonalEmailValue] = useState<string>(""); 
    const [workEmailValue, setWorkEmailValue] = useState<string>("");        

    // TODO: add social media, education, work

    const [relationshipsValue, setRelationshipsValue] = useState<string[]>([]); // TODO: change to Relationship[]

    const [groupsValue, setGroupsValue] = useState<string[]>([]); // TODO: change to Group[]

    const [interactionsValue, setInteractionsValue] = useState<string[]>([]); // TODO: change to Interaction[]

    const [dateAddedValue, setDateAddedValue] = useState("");
    const [dateLastUpdatedValue, setDateLastUpdatedValue] = useState("");
    const [dateLastInteractedValue, setDateLastInteractedValue] = useState("");
    const [miscJsonValue, setMiscJsonValue] = useState<object>({});

    // TODO: update all based on activeContact
    useEffect(() => {
        if (activeContact) {
            setFirstNameValue(activeContact.firstName || "")
            setLastNameValue(activeContact.lastName || "")
            setTitleValue(activeContact.title || "")
            setNotesValue(activeContact.notes || "")
            setPrimaryPhoneValue(activeContact.primaryPhone || "")
            setDateAddedValue(activeContact.dateAdded?.toString() || "")
            setDateLastUpdatedValue(activeContact.dateLastUpdated?.toString() || "")
            setDateLastInteractedValue(activeContact.dateLastInteracted?.toString() || "")
            setMiscJsonValue(activeContact)
        }
    }, [activeContact]);

    function getContactFieldData() {
        const contact: Contact = {
            _id: activeContact?._id,
            alias: [firstNameValue + " " + lastNameValue],
            firstName: firstNameValue,
            lastName: lastNameValue,
            personalEmail: personalEmailValue,
            notes: notesValue,
            title: titleValue,
            phoneNumber: primaryPhoneValue,
            relationships: relationshipsValue,
        }

        return contact;
    }

    return (

        <div>            
            <p>{activeContact?._id}</p>
            <ContactInputBox label={"First Name"} textValue={firstNameValue} setValue={setFirstNameValue} />
            <ContactInputBox label={"Last Name"} textValue={lastNameValue} setValue={setLastNameValue} />
            <ContactInputBox label={"Notes"} textValue={notesValue} setValue={setNotesValue} />
            <ContactInputBox label={"Title"} textValue={titleValue} setValue={setTitleValue} />
            <ContactInputBox label={"Phone Number"} textValue={primaryPhoneValue} setValue={setPrimaryPhoneValue} />
            <ContactInputBox label={"Email"} textValue={personalEmailValue} setValue={setPersonalEmailValue} />
            <InteractionList />
            <ContactInputBox label={"Date Added"} textValue={dateAddedValue} setValue={setDateAddedValue} />
            <ContactInputBox label={"Date Last Updated"} textValue={dateLastUpdatedValue} setValue={setDateLastUpdatedValue} />
            <ContactInputBox label={"Date Last Interacted"} textValue={dateLastInteractedValue} setValue={setDateLastInteractedValue} />
            <JsonView value={miscJsonValue} displayDataTypes={false} collapsed={1} quotes="" />
        </div>
    );
})

export default ContactView;