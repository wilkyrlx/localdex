/**
 * This file contains the Relationship type.
 * 
 * contactID: the ID of the contact this relationship is with
 * relationship: the relationship with the contact, i.e. Mom, Friend, Partner, etc.
 * 
 * NOTE: does not keep track of contactName since that may change.
 */
class Relationship {
    // TODO: add source contact too 
    contactSrc: string;
    contactDest: string;
    relationship: string;

    constructor(contactSrc: string, contactDest: string, relationship: string) {
        this.contactSrc = contactSrc;
        this.contactDest = contactDest;
        this.relationship = relationship;
    }
}

export default Relationship;