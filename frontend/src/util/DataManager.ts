import Contact from "../types/Contact";
import apiService from "./ApiService";

class DataManager {

    contacts: Contact[] = [];
    listeners: any[] = [];


    constructor() {
        this.contacts = [];
        this.listeners = [];
        this.loadData();
    }

    async loadData() {
        const contacts = await apiService.getData();
        this.contacts = contacts;
    }

    subscribe(listener: Function) {
        this.listeners.push(listener);
    }

    unsubscribe(listener: Function) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => {
            listener(this.contacts);
        });
    }

    updateContact(updatedContact: Contact) {
        apiService.updateContact(updatedContact)
        this.contacts = this.contacts.map(contact => {
            if (contact._id === updatedContact._id) {
                return updatedContact;
            } else {
                return contact;
            }
        });
        this.notifyListeners();
    }
}

// Create and export singleton instance of DatabaseManager
const dataManager = new DataManager();
export default dataManager;