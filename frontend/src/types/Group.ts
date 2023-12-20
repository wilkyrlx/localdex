class Group {
    _id?: string;
    name: string;
    members: string[] | undefined;

    // Constructor with overloads
    constructor(name: string);
    constructor(options: { _id: string, name: string, members: string[] });

    // Implementation of the constructor
    constructor(arg1: string | { _id: string, name: string, members: string[] }) {
        if (typeof arg1 === 'string') {
            this.name = arg1;
            this.members = [];
        } else if (typeof arg1 === 'object') {
            const { _id, name, members } = arg1;
            this._id = _id;
            this.name = name;
            this.members = members;
        } else {
            throw new Error('Invalid constructor invocation');
        }
    }
}

export default Group;