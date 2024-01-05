import Address from "./Address";

interface Job {
    // TODO: Add the missing properties
    role?: string | undefined;
    company: string;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    location?: Address | undefined;
    description?: string | undefined;
}

export default Job;