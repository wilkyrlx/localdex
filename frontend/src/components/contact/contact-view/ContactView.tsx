import Contact from "../../../types/Contact"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import ContactInputBox from "./reusable/ContactInputBox"
import JsonView from '@uiw/react-json-view';
import InteractionList from "./interaction-list/InteractionList";
import Interaction from "../../../types/Interaction";
import Relationship from "../../../types/Relationship";
import RelationshipList from "./relationship-list/RelationshipList";
import CollapsibleRegion from "./reusable/CollapsibleRegion";
import Group from "../../../types/Group";
import Address from "../../../types/Address";
import DateSelector from "./reusable/DateSelector";

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

    // TODO: may be better to not use 'value' naming scheme, also verify names are same as fields
    /* STEP 1: add useState for the field */
    const [firstNameValue, setFirstNameValue] = useState<string|undefined>(undefined);
    const [lastNameValue, setLastNameValue] = useState<string|undefined>(undefined);
    const [photoUriValue, setPhotoUriValue] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string|undefined>("");
    const [notesValue, setNotesValue] = useState<string|undefined>("");
    const [birthdayValue, setBirthdayValue] = useState<Date|undefined>(undefined);

    const [addressValue, setAddressValue] = useState<Address[]>([]);
    const [formerAddressesValue, setFormerAddressesValue] = useState<Address[]>([]); 

    const [primaryPhoneValue, setPrimaryPhoneValue] = useState<string|undefined>("");     // TODO: change to Phone
    const [alternatePhone, setAlternatePhone] = useState("");           // TODO: change to Phone

    const [personalEmailValue, setPersonalEmailValue] = useState<string|undefined>("");
    const [workEmailValue, setWorkEmailValue] = useState<string>("");

    // TODO: add social media, education, work

    const [relationshipsValue, setRelationshipsValue] = useState<Relationship[]>([]);

    const [groupsValue, setGroupsValue] = useState<Group[]>([]);

    const [interactionsValue, setInteractionsValue] = useState<Interaction[]>([]);

    const [dateAddedValue, setDateAddedValue] = useState<string|undefined>("");
    const [dateLastUpdatedValue, setDateLastUpdatedValue] = useState<string|undefined>("");
    const [dateLastInteractedValue, setDateLastInteractedValue] = useState<string|undefined>("");
    const [miscJsonValue, setMiscJsonValue] = useState<object>({});

    /* STEP 2: add useEffect to update the field when activeContact changes */
    useEffect(() => {
        if (activeContact) {
            setFirstNameValue(activeContact.firstName || undefined)
            setLastNameValue(activeContact.lastName || undefined)
            setPersonalEmailValue(activeContact.personalEmail || undefined)
            setTitleValue(activeContact.title || undefined)
            setNotesValue(activeContact.notes || undefined)
            setBirthdayValue(activeContact.birthday || undefined)
            setPrimaryPhoneValue(activeContact.primaryPhone || undefined)
            setInteractionsValue(activeContact.interactions || [])
            setRelationshipsValue(activeContact.relationships || [])
            setDateAddedValue(activeContact.dateAdded?.toString() || undefined)
            setDateLastUpdatedValue(activeContact.dateLastUpdated?.toString() || undefined)
            setDateLastInteractedValue(activeContact.dateLastInteracted?.toString() || undefined)
            setMiscJsonValue(activeContact)
        }
    }, [activeContact]);

    /* STEP 4: getContactFieldData to return the field's data */
    function getContactFieldData() {
        const contact: Contact = new Contact({
            _id: activeContact._id,
            alias: [firstNameValue + " " + lastNameValue],
            firstName: firstNameValue,
            lastName: lastNameValue,
            personalEmail: personalEmailValue,
            notes: notesValue,
            birthday: birthdayValue,
            title: titleValue,
            primaryPhone: primaryPhoneValue,
            relationships: relationshipsValue,
            interactions: interactionsValue,
        })

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
            <DateSelector date={birthdayValue} setDate={setBirthdayValue} />
            <CollapsibleRegion regionName="Addresses">
                {/* TODO: <p>TODO</p> */}
                <p>TODO</p>
            </CollapsibleRegion>
            <CollapsibleRegion regionName="Interactions">
                <InteractionList interactions={interactionsValue} setInteractions={setInteractionsValue} />
            </CollapsibleRegion>
            <CollapsibleRegion regionName="Relationships">
                <RelationshipList activeContact={activeContact} relationships={relationshipsValue} setRelationships={setRelationshipsValue} />
            </CollapsibleRegion>
            <CollapsibleRegion regionName="Metadata">
                <ContactInputBox label={"Date Added"} textValue={dateAddedValue} setValue={setDateAddedValue} />
                <ContactInputBox label={"Date Last Updated"} textValue={dateLastUpdatedValue} setValue={setDateLastUpdatedValue} />
                <ContactInputBox label={"Date Last Interacted"} textValue={dateLastInteractedValue} setValue={setDateLastInteractedValue} />
            </CollapsibleRegion>
            <JsonView value={miscJsonValue} displayDataTypes={false} collapsed={1} quotes="" />
        </div>
    );
})

export default ContactView;