import dotenv from 'dotenv'
import Contact from '../../../shared/types/Contact';

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

    async getData() {
        const response = await fetch(`${backendUri}/data`, {
            headers: this.generateHeaders()
        });
        const data = await response.json()
        return data
    }

    // TODO: handle headers
    async insertContact(contact: any) {
        const response = await fetch(`${backendUri}/insertContact`, {
            method: 'POST',
            headers: this.generateHeaders(),
            body: JSON.stringify(contact)
        })
        const data = await response.json()
        return data
    }

    async updateContact(contact: any) {
        const response = await fetch(`${backendUri}/updateContact`, {
            method: 'POST',
            headers: this.generateHeaders(),
            body: JSON.stringify(contact)
        })
        const data = await response.json()
        console.log(data)
        return data
    }
}

// Create and export a singleton instance of ApiService
const apiKey = process.env.REACT_APP_LOCALDEX_API_KEY || "NONE_API_KEY";
const backendUri = process.env.REACT_APP_BACKEND_URI || "NONE_BACKEND_URI";
const apiService = new ApiService(apiKey, backendUri);

export default apiService;