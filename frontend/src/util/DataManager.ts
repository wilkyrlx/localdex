import Contact from "../types/Contact";
import apiService from "./ApiService";

/**
 * DataManager is a singleton class that manages the data for the application.
 * 
 * It is responsible for:
 * - Loading data from the backend
 * - Storing the data in memory
 * - Notifying listeners when the data changes
 * - Updating the backend when the data changes
 * 
 * This class is a singleton, meaning that there is only one instance of it.
 * This is because we only want to have one source of truth for the data.
 * 
 * It uses an emitter pattern to notify listeners when the data changes. This is
 * handled in the subscribe, unsubscribe, and notifyListeners methods.
 * 
 * The CRUD methods (create, read, update, delete) are used to update the data.
 * Each method must:
 * - Update the data in memory
 * - Update the backend
 * - Notify listeners that the data has changed
 */
class DataManager {

    contacts: Contact[] = [];
    idsToContacts: Map<string, Contact> = new Map();
    listeners: any[] = [];


    constructor() {
        this.contacts = [];
        this.listeners = [];
        this.loadData();
    }

    async loadData() {
        // TODO: add a map of ID to contact
        const contacts: Contact[] = await apiService.getData();
        contacts.forEach(contact => {
            if (contact._id) {
                this.idsToContacts.set(contact._id, contact);
            }
        });
        this.contacts = contacts;
        console.log("DataManager: Loaded data from backend");
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


    // TODO: would be nice to set messages here

    // ========= CRUD methods =========
       
    // -------- create methods --------
    createContact(contact: Contact) {
        // update memory
        this.contacts.push(contact);

        // update backend, notify listeners
        apiService.insertContact(contact);
        this.notifyListeners();
    }

    createMultipleContacts(contacts: Contact[]) {
        // update memory
        this.contacts = this.contacts.concat(contacts);

        // update backend, notify listeners
        apiService.insertMultipleContacts(contacts);
        this.notifyListeners();
    }

    // -------- read methods --------
    readContacts() {
        return this.contacts;
    }

    readContactFromId(id: string): Contact | undefined {
        return this.idsToContacts.get(id);
    }

    // -------- update methods --------
    updateContact(updatedContact: Contact) {
        // update memory
        this.contacts = this.contacts.map(contact => {
            if (contact._id === updatedContact._id) {
                return updatedContact;
            } else {
                return contact;
            }
        });

        // update backend, notify listeners
        apiService.updateContact(updatedContact)
        this.notifyListeners();
    }

    // -------- delete methods --------
    deleteContact(deletedContact: Contact) {
        // update memory
        this.contacts = this.contacts.filter(contact => contact._id !== deletedContact._id);

        // update backend, notify listeners
        apiService.deleteContact(deletedContact);
        this.notifyListeners();
    }


}

// Create and export singleton instance of DatabaseManager
const dataManager = new DataManager();
export default dataManager;