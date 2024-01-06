
/**
 * Interface for the Interaction object
 * @field title: string - the title of the interaction (i.e. "Met at party", "Interviewed", "Had coffee")
 * @field notes: string - notes about the interaction
 * @field date: Date - the date of the interaction
 */
interface Interaction {
    title: string;
    notes: string;
    date: Date;
}

export default Interaction;