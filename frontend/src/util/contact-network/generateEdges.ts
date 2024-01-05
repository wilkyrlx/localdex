import Contact from "../../types/Contact";


interface Edge {
    id: string;
    source: string;
    target: string;
    label?: string;
}

function generateNetworkEdges(contacts: Contact[]): Edge[] {
    const edges: Edge[] = [];
    contacts.forEach((contact) => {
        if (contact.relationships) {
            contact.relationships.forEach((relationship) => {
                edges.push({
                    id: `${relationship.contactSrc}-${relationship.contactDest}`,
                    source: relationship.contactSrc,
                    target: relationship.contactDest,
                    label: relationship.relationship,
                });
            });
        }
    });
    return edges;
}

export default generateNetworkEdges;