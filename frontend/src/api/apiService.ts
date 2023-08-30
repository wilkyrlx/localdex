
/**
 * Service to handle API calls
 */
class apiService {

    static generateHeaders(): any {
        const headers = {
            'localdex-api-key': process.env.LOCALDEX_API_CLIENT_KEY || "NONE_API_KEY", 
        };
        return headers
    }

    static async getData() {
        const response = await fetch(process.env.REACT_APP_BACKEND_URI + '/data', {headers: this.generateHeaders()})
        const data = await response.json()
        return data
    }
}

export default apiService;