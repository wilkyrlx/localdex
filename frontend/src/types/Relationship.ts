class Relationship {
    contactID: string;
    contactName: string;
    relationship: string;

    constructor(contactID: string, relationship: string) {
        this.contactID = contactID;
        this.relationship = relationship;
        this.contactName = "";  // FIXME
    }
}

export default Relationship;