import Contact from "../../../types/Contact"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import ContactInputBox from "./ContactInputBox"
import JsonView from '@uiw/react-json-view';
import InteractionList from "./interaction-list/InteractionList";
import { Interaction } from "../../../types/Interaction";
import { Relationship } from "../../../types/Relationship";
import RelationshipList from "./relationship-list/RelationshipList";

interface ContactViewProps {
    activeContact: Contact;
}

/**
 * @param activeContact the contact to display
 * @param ref a ref to the ContactView component
 * @returns a ContactView component
 * 
 * NOTE: when adding functionality for a new field, must add:
 * 1. useState for the field
 * 2. useEffect to update the field when activeContact changes
 * 3. ContactInputBox or likewise to display and edit the field
 * 4. getContactFieldData to return the field's data
 */
const ContactView = forwardRef<any, ContactViewProps>((props, ref) => {
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

    const [relationshipsValue, setRelationshipsValue] = useState<Relationship[]>([]);

    const [groupsValue, setGroupsValue] = useState<string[]>([]); // TODO: change to Group[]

    const [interactionsValue, setInteractionsValue] = useState<Interaction[]>([]);

    const [dateAddedValue, setDateAddedValue] = useState("");
    const [dateLastUpdatedValue, setDateLastUpdatedValue] = useState("");
    const [dateLastInteractedValue, setDateLastInteractedValue] = useState("");
    const [miscJsonValue, setMiscJsonValue] = useState<object>({});

    // TODO: update all based on activeContact
    useEffect(() => {
        if (activeContact) {
            setFirstNameValue(activeContact.firstName || "")
            setLastNameValue(activeContact.lastName || "")
            setPersonalEmailValue(activeContact.personalEmail || "")
            setTitleValue(activeContact.title || "")
            setNotesValue(activeContact.notes || "")
            setPrimaryPhoneValue(activeContact.primaryPhone || "")
            setInteractionsValue(activeContact.interactions || [])
            setRelationshipsValue(activeContact.relationships || [])
            setDateAddedValue(activeContact.dateAdded?.toString() || "")
            setDateLastUpdatedValue(activeContact.dateLastUpdated?.toString() || "")
            setDateLastInteractedValue(activeContact.dateLastInteracted?.toString() || "")
            setMiscJsonValue(activeContact)
        }
    }, [activeContact]);

    function getContactFieldData() {
        const contact: Contact = new Contact({
            _id: activeContact._id,
            alias: [firstNameValue + " " + lastNameValue],
            firstName: firstNameValue,
            lastName: lastNameValue,
            personalEmail: personalEmailValue,
            notes: notesValue,
            title: titleValue,
            primaryPhone: primaryPhoneValue,
            relationships: relationshipsValue,
            interactions: interactionsValue,
        })

        return contact;
    }


    // TODO: make some sections collapsible
    return (

        <div>
            <p>{activeContact?._id}</p>
            <ContactInputBox label={"First Name"} textValue={firstNameValue} setValue={setFirstNameValue} />
            <ContactInputBox label={"Last Name"} textValue={lastNameValue} setValue={setLastNameValue} />
            <ContactInputBox label={"Notes"} textValue={notesValue} setValue={setNotesValue} />
            <ContactInputBox label={"Title"} textValue={titleValue} setValue={setTitleValue} />
            <ContactInputBox label={"Phone Number"} textValue={primaryPhoneValue} setValue={setPrimaryPhoneValue} />
            <ContactInputBox label={"Email"} textValue={personalEmailValue} setValue={setPersonalEmailValue} />
            <InteractionList interactions={interactionsValue} setInteractions={setInteractionsValue} />
            <RelationshipList activeContact={activeContact} relationships={relationshipsValue} setRelationships={setRelationshipsValue} />
            <ContactInputBox label={"Date Added"} textValue={dateAddedValue} setValue={setDateAddedValue} />
            <ContactInputBox label={"Date Last Updated"} textValue={dateLastUpdatedValue} setValue={setDateLastUpdatedValue} />
            <ContactInputBox label={"Date Last Interacted"} textValue={dateLastInteractedValue} setValue={setDateLastInteractedValue} />
            <JsonView value={miscJsonValue} displayDataTypes={false} collapsed={1} quotes="" />
        </div>
    );
})

export default ContactView;