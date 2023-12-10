import dotenv from 'dotenv'
import Contact from '../../../shared/types/Contact';

// TODO: some way to normalize contacts, may need refactoring

/**
 * Service to handle API calls
 */
class ApiService {
    apiKey: string;
    backendUri: string;

    constructor(apiKey: string, backendUri: string) {
        this.apiKey = apiKey;
        this.backendUri = backendUri;
    }

    generateHeaders(): any {
        const headers = {
            'localdex-api-key': apiKey,
            'Content-Type': 'application/json'
        };
        return headers
    }

    // TODO: data is too big right now to get all of it at once
    async getData() {
        const response = await fetch(`${backendUri}/data`, {
            headers: this.generateHeaders()
        });
        const data = await response.json()
        return data
    }

    async insertContact(contact: Contact) {
        // contact.normalize()
        const response = await fetch(`${backendUri}/insertContact`, {
            method: 'POST',
            headers: this.generateHeaders(),
            body: JSON.stringify(contact)
        })
        const data = await response.json()
        return data
    }

    async insertMultipleContacts(contacts: Contact[]) {
        // contacts.forEach(contact => contact.normalize())
        const batchSize = 50;
        const batchCount = Math.ceil(contacts.length / batchSize);
        for (let i = 0; i < batchCount; i++) {
            const batch100 = contacts.slice(i * batchSize, (i + 1) * batchSize);
            await fetch(`${backendUri}/insertMultipleContacts`, {
                method: 'POST',
                headers: this.generateHeaders(),
                body: JSON.stringify(batch100)
            })
        }
        const data = { message: 'insertMultipleContacts called, status unknown'}
        return data
    }

    async updateContact(contact: Contact) {
        // contact.normalize()
        const response = await fetch(`${backendUri}/updateContact`, {
            method: 'POST',
            headers: this.generateHeaders(),
            body: JSON.stringify(contact)
        })
        const data = await response.json()
        console.log(data)
        return data
    }

    async deleteContact(contact: Contact) {
        const response = await fetch(`${backendUri}/deleteContact`, {
            method: 'POST',
            headers: this.generateHeaders(),
            body: JSON.stringify(contact)
        })
        const data = await response.json()
        return data
    }
}

// Create and export a singleton instance of ApiService
const apiKey = process.env.REACT_APP_LOCALDEX_API_KEY || "NONE_API_KEY";
const backendUri = process.env.REACT_APP_BACKEND_URI || "NONE_BACKEND_URI";
const apiService = new ApiService(apiKey, backendUri);

export default apiService;