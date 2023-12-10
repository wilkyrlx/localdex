import React, { useState } from 'react';
import VCard from 'vcf';
import VcardImportClient from '../../import-clients/VcardImportClient';
import Contact from '../../../../shared/types/Contact';
import apiService from '../../util/apiService';
import { useMessageContext } from '../../AppContext';

function VCardParser() {

    const { setMessage } = useMessageContext();

    async function handleFileChange (e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (file) {
            try {
                const vCardData: string = await readFileAsync(file);
                const client = new VcardImportClient(vCardData);
                const parsedCards: Contact[] = client.importToContacts();
                
                await apiService.insertMultipleContacts(parsedCards);
                
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
            <h1>Import from Vcard</h1>
            <input type="file" onChange={handleFileChange} accept=".vcf" />
        </div>
    );
}

export default VCardParser;
