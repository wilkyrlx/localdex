/**
 * This file contains the Relationship type.
 * 
 * contactID: the ID of the contact this relationship is with
 * relationship: the relationship with the contact, i.e. Mom, Friend, Partner, etc.
 * 
 * NOTE: does not keep track of contactName since that may change.
 */
interface Relationship {
    contactSrc: string;
    contactDest: string;
    relationship?: string;
}

export default Relationship;

