import Contact from "../types/Contact";

const contact1 = new Contact({
    "_id": "1",
    "firstName": "John Doe"
});

const contact2 = new Contact({
    "_id": "2",
    "firstName": "Jane Doe"
});

const fakeConstacts = [contact1, contact2];

export default fakeConstacts;