import Relationship from "../../../../types/Relationship"
import dataManager from "../../../../util/DataManager"

// TODO: give it its own CSS
function RelationshipListItem({ relationship }: { relationship: Relationship }) {


    function getContactName(): string {
        const contact = dataManager.readContactFromId(relationship.contactDest)
        if (contact.firstName === undefined) {
            return contact._id
        }
        return contact.firstName + " " + contact.lastName
    }
   
    return (
        <div className="interaction-list-item">
            <div className="interaction-header"> 
                <p className="interaction-title">{ getContactName() }</p>  
                <p className="interaction-content">{ relationship.relationship }</p>
            </div>
        </div>
    )
}

export default RelationshipListItem

