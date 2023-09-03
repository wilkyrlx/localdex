import React, { useState } from 'react';
import VCard from 'vcf';

function VCardParser() {
  const [cards, setCards] = useState<any[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const vCardData = await readFileAsync(file);
        const parsedCards = parseVCardNames(vCardData);
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

  const parseVCardNames = (vCardData: string): VCard[] => {
    const vCards = vCardData.split('END:VCARD');
    return vCards
      .filter((vCard) => vCard.trim() !== '')
      .map((vCardData, index) => {
        const vCard: VCard = new VCard().parse(vCardData + 'END:VCARD');
        return vCard;
      });
  };

  return (
    <div>
      <h1>VCard Name List</h1>
      <input type="file" onChange={handleFileChange} accept=".vcf" />
      <button onClick={() => console.log(cards)}>Log Cards</button>
        <ul>
            {cards.map((card, index) => (
                <li key={index}>{card.get('n').valueOf()}</li>
            ))}
        </ul>
    </div>
  );
}

export default VCardParser;
