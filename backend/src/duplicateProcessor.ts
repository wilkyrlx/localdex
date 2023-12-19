import fuzz from "fuzzball";
import mockContacts from "./mock-data/contacts";
// FIXME: add contact type


/**
 * Loads and identifies potential duplicates from all contacts in the database
 */
class DuplicateProcessor {

    // all contacts in the database
    private contacts: any[] = [];   
    // map of contactID to set of contactIDs that are potential duplicates
    private potentialDuplicates: { [contactID: string]: Set<string> } = {}; 

    constructor(contact: any[]) {
        this.contacts = contact;        
        this.deduplicateAllContacts();
    }

    public getPotentialDuplicates() {
        return this.potentialDuplicates;
    }


    private deduplicateAllContacts() {
        for (let i = 0; i < this.contacts.length; i++) {
            this.deduplicateContact(this.contacts[i], i);
        }
    }

    private deduplicateContact(contact: any, startIndex: number) {
        for (let i = startIndex + 1; i < this.contacts.length; i++) {
            if (this.isPotentialDuplicate(contact, this.contacts[i])) {
                const contactID: string | undefined = contact._id;
                const potentialDuplicateID: string | undefined = this.contacts[i]._id;
                if (!contactID) throw new Error("Contact ID is undefined");
                if (!potentialDuplicateID) throw new Error("Potential duplicate ID is undefined");
                this.potentialDuplicates[contactID] = this.potentialDuplicates[contactID] || new Set();
                this.potentialDuplicates[contactID].add(potentialDuplicateID);
            }
        }
    }

    // returns true if both a and b are defined and equal
    public existsAndEqual(a: any, b: any): Boolean {
        return (a === undefined && b === undefined) ? false : a === b;
    } 

    
    // TODO: should email, phone, etc be normalized before comparing?
    /**
     * Checks two contacts and determines if they could be duplicates
     * 
     * @param contact first contact to compare
     * @param dupe second contact to compare
     */
    public isPotentialDuplicate(contact: any, dupe: any): Boolean {
        let similarity = 0;

        // check email (exact match)
        if (this.existsAndEqual(contact.personalEmail, dupe.personalEmail)) similarity += 100;
        if (this.existsAndEqual(contact.workEmail, dupe.workEmail)) similarity += 100;
        
        // check phone (exact match)
        if (this.existsAndEqual(contact.primaryPhone, dupe.primaryPhone)) similarity += 100;
        if (this.existsAndEqual(contact.workPhone, dupe.workPhone)) similarity += 100;

        // if no last name, look for matching first name (exact match)
        if (!contact.lastName || !dupe.lastName) {
            if (this.existsAndEqual(contact.firstName?.normalize(), dupe.firstName?.normalize())) similarity += 50;
        }

        // check full name similarity (fuzzy match)
        const contactFullName = (contact.firstName || '') + (contact.lastName || '');
        const dupeFullName = (dupe.firstName || '') + (dupe.lastName || '');
        if (contactFullName !== '' && dupeFullName !== '') {
            similarity += fuzz.ratio(contactFullName, dupeFullName);
        }

        // TODO: make similarity variable
        if (similarity > 80) {
            // console.log(`Potential duplicate found: ${contactFullName} and ${dupeFullName} with similarity ${similarity}`);
            return true;
        } else {
            return false;
        }
    }


}

export default DuplicateProcessor;