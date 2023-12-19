import React, { useState } from 'react';
import VcardImportClient from '../../import-clients/VcardImportClient';
import Contact from '../../types/Contact';
import { useMessageContext } from '../../AppContext';
import dataManager from '../../util/DataManager';

function IPhoneParser() {

    const { setMessage } = useMessageContext();

    async function handleFileChange (e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (file) {
            try {
                const vCardData: string = await readFileAsync(file);
                const client = new VcardImportClient(vCardData, "imported from iPhone");
                const parsedCards: Contact[] = client.importToContacts();
                
                dataManager.createMultipleContacts(parsedCards);                
                setMessage(`Successfully imported ${parsedCards.length} contacts`);
            } catch (error) {
                console.error('Error reading or parsing vCard:', error);
            }
        }
    };

    function readFileAsync (file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    };

    return (
        <div>
            <h1>Import from iPhone Contacts</h1>
            <p>Instructions: TODO</p>
            <input type="file" onChange={handleFileChange} accept=".vcf" />
        </div>
    );
}

export default IPhoneParser;
