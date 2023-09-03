import Contact from "../../../shared/types/Contact";

interface IImportClient {
    import(): Promise<Contact[]>;
}

export default IImportClient;