
class Interaction {
    title: string;
    notes: string;
    date: Date;

    constructor(title: string, notes: string, date: Date) {
        this.title = title;
        this.notes = notes;
        this.date = date;
    }
}

export default Interaction;