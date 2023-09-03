import Contact from "../../../shared/types/Contact";
import IImportClient from "./IImportClient";

class VcardImportClient implements IImportClient {
    import(): Promise<Contact[]> {
        
        const c = new Contact({
            _id: "123",
            alias: ["test"],
            dateAdded: new Date(),
            dateLastUpdated: new Date(),
            dateLastInteracted: new Date(),
            firstName: "test"
        });

        
c.grad
     
        return new Promise<Contact[]>((resolve, reject) => {
            // ...
        });
    }
}