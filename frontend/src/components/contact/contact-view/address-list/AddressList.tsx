import { useState } from "react";
import Address from "../../../../types/Address";
import ContactInputBox from "../reusable/ContactInputBox";
import DateSelector from "../reusable/DateSelector";
import AddressListItem from "./AddressListItem";

function AddressList({ addresses, setAddresses }: { addresses: Address[], setAddresses: Function }) {


    const [addressLocation, setAddressLocation] = useState<string|undefined>(undefined);
    const [addressDescription, setAddressDescription] = useState<string|undefined>(undefined);
    const [addressStartDate, setAddressStartDate] = useState<Date|undefined>(undefined);
    const [addressEndDate, setAddressEndDate] = useState<Date|undefined>(undefined);

    function addAddress() {
        if (addressLocation === undefined) {
            return;
        }
        const newAddress: Address = {
            address: addressLocation,
            description: addressDescription,
            // TODO: figure out coordinates
            startDate: addressStartDate,
            endDate: addressEndDate
        }
        setAddresses([...addresses, newAddress])
    }

    // TODO
    return (
        <div>
            <h1>Address List</h1>
            <ContactInputBox label={"Location"} textValue={addressLocation} setValue={setAddressLocation} />
            <ContactInputBox label={"Description"} textValue={addressDescription} setValue={setAddressDescription} />
            <DateSelector date={addressStartDate} setDate={setAddressStartDate} />
            <DateSelector date={addressEndDate} setDate={setAddressEndDate} />
            <button onClick={addAddress}>Add Address</button>
            <ul className="address-list">
                {addresses.map((address) => <AddressListItem address={address} />)}
            </ul>
        </div>
    )
}

export default AddressList