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
            const contact: Contact = {
                alias: [],
                personalEmail: vCard.get('email')?.valueOf() as string,
                primaryPhone: vCard.get('tel')?.valueOf() as string
            };

            const rawName: string | Object = vCard.get('n')?.valueOf();
            if (typeof rawName === 'string') {
                const names = rawName.split(';');
                contact.firstName = names[1];
                contact.lastName = names[0];
            }

            console.log(contact);
            return contact;
        });
    }
}

export default VcardImportClient;