import Contact from "../types/contact"

function ContactView() {

    async function loadRandomContact() {
        const response = await fetch('http://localhost:8080/data')
        const data = await response.json()
        const contact: Contact = data[Math.floor(Math.random() * data.length)]
        document.getElementById('name')!.innerHTML = contact.alias[0]
        document.getElementById('email')!.innerHTML = contact.personalEmail || "No email"
        document.getElementById('phone')!.innerHTML = contact.primaryPhone || "No phone number"
        console.log(contact)
    }

    return (
        <div>
            <h1>Contact View</h1>
            <button onClick={() => loadRandomContact()}>Load Random Contact</button>
            <p id="name">Name</p>
            <p id="email">Email</p>
            <p id="phone">Phone</p>
        </div>
    );
}

export default ContactView;