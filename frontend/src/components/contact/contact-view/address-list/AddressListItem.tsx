import Address from "../../../../types/location/Address";

function AddressListItem({ address }: { address: Address }) {

    // TODO: give it its own CSS
    return (
        <div>
            <div className="interaction-list-item">
                <div className="interaction-header">
                    <p className="interaction-title">{address.address}</p>
                </div>
                <p className="interaction-content">{address.description}</p>
                <p className="interaction-content">{address.startDate?.toDateString()}</p>
                <p className="interaction-content">{address.endDate?.toDateString()}</p>
            </div>
        </div>
    )
}

export default AddressListItem