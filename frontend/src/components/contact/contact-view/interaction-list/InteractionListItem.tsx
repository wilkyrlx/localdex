import Interaction from "../../../../types/Interaction"

function InteractionListItem({ interaction }: { interaction: Interaction }) {
    return (
        <div className="interaction-list-item">
            <div className="interaction-header"> 
                <p className="interaction-title">{ interaction.title }</p>
                <p className="interaction-date">{ interaction.date.toDateString() }</p>
            </div>
            <p className="interaction-content">{ interaction.notes }</p>
        </div>
    )
}

export default InteractionListItem