import Contact from "../../shared/types/Contact";
import fuzz from "fuzzball";
import mockContacts from "./mock-data/contacts";

/**
 * Loads and identifies potential duplicates from all contacts in the database
 */
class DuplicateProcessor {

    // all contacts in the database
    private contacts: Contact[] = [];   
    // map of contactID to set of contactIDs that are potential duplicates
    private potentialDuplicates: { [contactID: string]: Set<string> } = {}; 

    constructor(contact: Contact[]) {
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

    private deduplicateContact(contact: Contact, startIndex: number) {
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
    
    // TODO: should email, phone, etc be normalized before comparing?
    // TODO: calibrate similarity thresholds
    /**
     * Checks two contacts and determines if they could be duplicates
     * 
     * @param contact first contact to compare
     * @param dupe second contact to compare
     */
    public isPotentialDuplicate(contact: Contact, dupe: Contact): Boolean {
        let similarity = 0;

        // check email (exact match)
        if (contact.personalEmail === dupe.personalEmail) similarity += 100;
        if (contact.workEmail === dupe.workEmail) similarity += 100;
        
        // check phone (exact match)
        if (contact.personalPhone === dupe.personalPhone) similarity += 100;
        if (contact.workPhone === dupe.workPhone) similarity += 100;


        // if no last name, look for matching first name (exact match)
        if (!contact.lastName) {
            if (contact.firstName?.normalize() === dupe.firstName?.normalize()) similarity += 50;
        }

        // check full name (fuzzy match)
        const contactFullName = `${contact.firstName} ${contact.lastName}`;
        const dupeFullName = `${dupe.firstName} ${dupe.lastName}`;
        const fullNameSimilarity = fuzz.ratio(contactFullName, dupeFullName);
        similarity += fullNameSimilarity;

        if (similarity > 120) {
            return true;
        } else {
            return false;
        }
    }


}

export default DuplicateProcessor;