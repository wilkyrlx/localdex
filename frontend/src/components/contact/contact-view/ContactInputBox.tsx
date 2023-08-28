import { SetStateAction } from "react";

interface ContactInputBoxProps {
    label: string;
    textValue: string;
    setValue: (value: SetStateAction<string>) => void;
}

function ContactInputBox({label, textValue, setValue}: ContactInputBoxProps) {
    return (
        <div className="contact-input-bar">
            <p>{label}</p>
            <input
                type="text"
                name="name"
                onChange={(ev) => setValue(ev.target.value)}
                value={textValue}
            />
        </div>
    )
}

export default ContactInputBox 