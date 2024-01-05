import { Relationship } from "../../../../types/Relationship"

// TODO: give it its own CSS
function RelationshipListItem({ relationship }: { relationship: Relationship }) {
    return (
        <div className="interaction-list-item">
            <div className="interaction-header"> 
                {/* TODO: look up contactDest ID to get name/alias */}
                <p className="interaction-title">{ relationship.contactDest }</p>  
                <p className="interaction-content">{ relationship.relationship }</p>
            </div>
        </div>
    )
}

export default RelationshipListItem

