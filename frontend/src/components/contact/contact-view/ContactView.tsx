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
import Address from "../../../types/location/Address";
import DateSelector from "./reusable/DateSelector";
import AddressList from "./address-list/AddressList";

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
    const [firstName, setFirstName] = useState<string|undefined>(undefined);
    const [lastName, setLastName] = useState<string|undefined>(undefined);
    const [photoUri, setPhotoUri] = useState<string>("");
    const [title, setTitle] = useState<string|undefined>(undefined);
    const [notes, setNotes] = useState<string|undefined>(undefined);
    const [birthday, setBirthday] = useState<Date|undefined>(undefined);

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [formerAddresses, setFormerAddresses] = useState<Address[]>([]); 

    const [primaryPhone, setPrimaryPhone] = useState<string|undefined>("");     // TODO: change to Phone
    const [alternatePhone, setAlternatePhone] = useState("");           // TODO: change to Phone

    const [personalEmail, setPersonalEmail] = useState<string|undefined>(undefined);
    const [workEmail, setWorkEmail] = useState<string>("");

    // TODO: add social media, education, work

    const [relationships, setRelationships] = useState<Relationship[]>([]);

    const [groups, setGroups] = useState<Group[]>([]);

    const [interactions, setInteractions] = useState<Interaction[]>([]);

    const [dateAdded, setDateAdded] = useState<string|undefined>("");
    const [dateLastUpdated, setDateLastUpdated] = useState<string|undefined>("");
    const [dateLastInteracted, setDateLastInteracted] = useState<string|undefined>("");
    const [miscJson, setMiscJson] = useState<object>({});

    /* STEP 2: add useEffect to update the field when activeContact changes */
    useEffect(() => {
        if (activeContact) {
            setFirstName(activeContact.firstName || undefined)
            setLastName(activeContact.lastName || undefined)
            setPersonalEmail(activeContact.personalEmail || undefined)
            setTitle(activeContact.title || undefined)
            setNotes(activeContact.notes || undefined)
            setBirthday(activeContact.birthday || undefined)
            setAddresses(activeContact.addresses || [])
            setPrimaryPhone(activeContact.primaryPhone || undefined)
            setInteractions(activeContact.interactions || [])
            setRelationships(activeContact.relationships || [])
            setDateAdded(activeContact.dateAdded?.toString() || undefined)
            setDateLastUpdated(activeContact.dateLastUpdated?.toString() || undefined)
            setDateLastInteracted(activeContact.dateLastInteracted?.toString() || undefined)
            setMiscJson(activeContact)
        }
    }, [activeContact]);

    /* STEP 4: getContactFieldData to return the field's data */
    function getContactFieldData() {
        const contact: Contact = new Contact({
            _id: activeContact._id,
            alias: [firstName + " " + lastName],
            firstName: firstName,
            lastName: lastName,
            personalEmail: personalEmail,
            notes: notes,
            birthday: birthday,
            addresses: addresses,
            title: title,
            primaryPhone: primaryPhone,
            relationships: relationships,
            interactions: interactions,
        })

        return contact;
    }

    return (

        <div>
            <p>{activeContact?._id}</p>
            <ContactInputBox label={"First Name"} textValue={firstName} setValue={setFirstName} />
            <ContactInputBox label={"Last Name"} textValue={lastName} setValue={setLastName} />
            <ContactInputBox label={"Notes"} textValue={notes} setValue={setNotes} />
            <ContactInputBox label={"Title"} textValue={title} setValue={setTitle} />
            <ContactInputBox label={"Phone Number"} textValue={primaryPhone} setValue={setPrimaryPhone} />
            <ContactInputBox label={"Email"} textValue={personalEmail} setValue={setPersonalEmail} />
            <DateSelector date={birthday} setDate={setBirthday} />
            <CollapsibleRegion regionName="Addresses">
                <AddressList addresses={addresses} setAddresses={setAddresses} />
            </CollapsibleRegion>
            <CollapsibleRegion regionName="Interactions">
                <InteractionList interactions={interactions} setInteractions={setInteractions} />
            </CollapsibleRegion>
            <CollapsibleRegion regionName="Relationships">
                <RelationshipList activeContact={activeContact} relationships={relationships} setRelationships={setRelationships} />
            </CollapsibleRegion>
            <CollapsibleRegion regionName="Metadata">
                <ContactInputBox label={"Date Added"} textValue={dateAdded} setValue={setDateAdded} />
                <ContactInputBox label={"Date Last Updated"} textValue={dateLastUpdated} setValue={setDateLastUpdated} />
                <ContactInputBox label={"Date Last Interacted"} textValue={dateLastInteracted} setValue={setDateLastInteracted} />
            </CollapsibleRegion>
            <JsonView value={miscJson} displayDataTypes={false} collapsed={1} quotes="" />
        </div>
    );
})

export default ContactView;