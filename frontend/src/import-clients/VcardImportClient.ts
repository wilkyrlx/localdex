import e, { raw } from "express";
import Contact from "../../../shared/types/Contact";
import ImportClient from "./ImportClient";
import VCard from 'vcf';

class VcardImportClient extends ImportClient {
    importToContacts(input: string): Contact[] {
        const vCards: string[] = input.split('END:VCARD');
        const vCardsActual: VCard[] = vCards
            .filter((vCard) => vCard.trim() !== '')
            .map((vCardData, index) => {
                const vCard: VCard = new VCard().parse(vCardData + 'END:VCARD');
                return vCard;
            });

        return vCardsActual.map((vCard) => {
            return this.buildContact(vCard);
        });
    }

    buildContact(rawData: VCard): Contact {

        // build from VCard data
        // TODO: set alias and fix issues with personalEmail and primaryPhone as objects, not strings
        const contact: Contact = {
            alias: [],
            personalEmail: rawData.get('email')?.valueOf() as string,
            primaryPhone: rawData.get('tel')?.valueOf() as string
        };

        // set first and last name
        const rawName: string | Object = rawData.get('n')?.valueOf();
        if (typeof rawName === 'string') {
            const names = rawName.split(';');
            contact.firstName = names[1];
            contact.lastName = names[0];
        }

        // set metadata
        const date = new Date();
        contact.dateAdded = date;
        contact.dateLastUpdated = date;
        contact.source = 'imported from vCard';

        return contact;
    }
}

export default VcardImportClient;