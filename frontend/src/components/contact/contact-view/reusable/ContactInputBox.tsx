import { SetStateAction } from "react";

interface ContactInputBoxProps {
    label: string|undefined;
    textValue: string|undefined;
    setValue: (value: SetStateAction<string|undefined>) => void;
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