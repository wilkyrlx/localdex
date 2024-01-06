/**
 * This file contains the Relationship type.
 * 
 * @field contactSrc: the source contact's ID
 * @field contactDest: the destination contact's ID
 * @field relationship: the relationship with the contact, i.e. Mom, Friend, Partner, etc.
 * 
 * NOTE: does not keep track of contactName since that may change.
 */
interface Relationship {
    contactSrc: string;
    contactDest: string;
    relationship?: string;
}

export default Relationship;

