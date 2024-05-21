import Contact from "../../types/Contact";

export default function standardNormalize(contact: Contact) {
    if (contact.primaryPhone) {
        // TODO: use a number parser library
        contact.primaryPhone = contact.primaryPhone
    }

    if (contact.addresses) {
        // for each address, if it doesn't have coordinates, try to get them via geocoding
        for (let i = 0; i < contact.addresses.length; i++) {
            if (!contact.addresses[i].coordinates) {
                // TODO: geocode
                contact.addresses[i].coordinates = "TODO: geocode"
            } 
        }
    }
}

