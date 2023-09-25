import IPhoneParser from "../import/IPhoneParser";
import VCardParser from "../import/VCardParser";

function ImportPage() {
    return (
        <div>
            <h1>Import</h1>
            <p>This is the import page</p>
            <VCardParser />
            <IPhoneParser />
        </div>
    );
}

export default ImportPage;