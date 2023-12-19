import Contact from "../../types/Contact";


interface Node {
    id: string;
    label?: string;
}

function generateNetworkNodes(contacts: Contact[]): Node[] {
    const nodes: Node[] = [];

    contacts.forEach((contact) => {
        if (contact._id) {
            nodes.push({
                id: contact._id,
                label: contact.firstName + " " + contact.lastName,
            });
        }
    });

    return nodes;
}

export default generateNetworkNodes;