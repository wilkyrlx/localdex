import Contact from "../../../shared/types/Contact";
import { Diff } from "diff";

abstract class ImportClient {

    // Takes in a string of data and returns an array of contacts
    abstract importToContacts(input: string): Contact[];

    abstract buildContact(rawData: any): Contact;

    // TODO: (Diff as any) is a hacky workaround 
    static checkFileDiff(oldFile: string, newFile: string) {

        const diff = (Diff as any).diffChars(oldFile, newFile);

        diff.filter((part: any) => {
            return part.added;
        });

        return diff;
    }
}

export default ImportClient;