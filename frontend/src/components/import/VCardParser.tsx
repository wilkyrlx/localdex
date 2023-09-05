import React, { useState } from 'react';
import VCard from 'vcf';
import VcardImportClient from '../../import-clients/VcardImportClient';
import Contact from '../../../../shared/types/Contact';

function VCardParser() {
  const [cards, setCards] = useState<Contact[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const vCardData: string = await readFileAsync(file);
        const client = new VcardImportClient();
        const parsedCards = client.importToContacts(vCardData);
        setCards(parsedCards);
      } catch (error) {
        console.error('Error reading or parsing vCard:', error);
      }
    }
  };

  const readFileAsync = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };


  return (
    <div>
      <h1>VCard Name List</h1>
      <input type="file" onChange={handleFileChange} accept=".vcf" />
      <button onClick={() => console.log(cards)}>Log Cards</button>
        <ul>
            {cards.map((card, index) => (
                <li key={index}>{card.firstName} {card.lastName}</li>
            ))}
        </ul>
    </div>
  );
}

export default VCardParser;
