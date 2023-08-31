import dotenv from 'dotenv'
import Contact from '../../../shared/types/Contact';

/**
 * Service to handle API calls
 */
class apiService {

    static generateHeaders(): any {        
        const headers = {
            'localdex-api-key': process.env.REACT_APP_LOCALDEX_API_KEY || "NONE_API_KEY", 
        };
        return headers
    }

    static async getData() {
        const response = await fetch(process.env.REACT_APP_BACKEND_URI + '/data', {
            headers: this.generateHeaders()
        });
        const data = await response.json()
        return data
    }

    // TODO: handle headers
    static async insertContact(contact: any) {
        const response = await fetch(process.env.REACT_APP_BACKEND_URI + '/insertContact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
        const data = await response.json()
        return data
    }

    static async updateContact(contact: any) {
        const response = await fetch(process.env.REACT_APP_BACKEND_URI + '/updateContact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
        const data = await response.json()
        console.log(data)
        return data
    }
}

export default apiService;