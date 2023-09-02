import ContactBase from "./ContactBase";

/**
 * Contact object with ContactBase fields and additional optional fields
 */
interface Contact extends ContactBase {
    [key: string]: any;
}


export default Contact;