interface ContactBase {
    // Contact information
    alias: string[];        // Array of aliases, if no first + last name, choose first alias
    firstName?: string;
    lastName?: string;
    photoUri?: string[];
    notes?: string;
    birthday?: Date;
    title?: string;         // description of user (i.e. "promoter", "landlord", "swe @ google")

    // Physical address
    address?: string[];     // TODO: change to address object (string + description tuple)
    formerAddresses?: string[];    // TODO: change to address object (string + description tuple)

    // Phone numbers
    primaryPhone?: string;          // TODO: change to phone object
    alternatePhone?: string[];       // TODO: change to phone object + description tuple

    // Email addresses
    personalEmail?: string;
    workEmail?: string;

    // Social media
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    snapchat?: string;
    github?: string;

    // Education
    highSchool?: string;    // TODO: change to school object (school name + dates attended)
    college?: string;       // TODO: change to school object (school name + dates attended)
    gradSchool?: string;    // TODO: change to school object (school name + dates attended)

    // Work
    currentJob?: string;    // TODO: change to job object
    pastJobs?: string[];    // TODO: change to job object

    // Relationships
    relationships?: string[];   // TODO: change to relationship object (ID + description)

    // Groups
    groups?: string[];          // TODO: change to group object (ID + description)

    // Interactions
    interactions?: string[];    // TODO: change to interaction object (Date + description)

    // Metadata
    dateAdded: Date;            // date contact was added to database
    dateLastUpdated: Date;      // last time any field was updated
    // TODO: change below to interaction object
    dateLastInteracted?: Date;   // last time user interacted with contact, either in person or virtually. Generated from log

}

export default ContactBase;