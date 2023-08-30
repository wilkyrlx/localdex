import dotenv from 'dotenv'

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
        const response = await fetch(process.env.REACT_APP_BACKEND_URI + '/data', {headers: this.generateHeaders()})
        const data = await response.json()
        return data
    }

    // TODO: handle headers and return response here
    static async insertContact(contact: any) {
        fetch(process.env.REACT_APP_BACKEND_URI + '/insertContact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        })
    }
}

export default apiService;