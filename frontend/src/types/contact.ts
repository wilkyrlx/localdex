interface Contact {
    // Contact information
    alias: string[];        // Array of aliases, if no first + last name, choose first alias
    firstName?: string;
    lastName?: string;
    photoUri?: string[];
    notes?: string;
    birthday?: Date;

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
    highSchool?: string;
    college?: string;
    gradSchool?: string;

    // Work
    currentJob?: string;    // TODO: change to job object
    pastJobs?: string[];    // TODO: change to job object
    personalRelationshipRole?: string;      // description of iser's personal interactions with someone (i.e. "promoter", "landlord")

    // Relationships
    relationships?: string[];   // TODO: change to relationship object (ID + description)

    // Interactions
    interactions?: string[];    // TODO: change to interaction object (Date + description)

    // Metadata
    dateAdded: Date;            // date contact was added to database
    dateLastUpdated: Date;      // last time any field was updated
    // TODO: change below to interaction object
    dateLastInteracted?: Date;   // last time user interacted with contact, either in person or virtually. Generated from log

}

export default Contact;