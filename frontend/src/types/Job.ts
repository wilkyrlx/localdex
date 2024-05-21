import Address from "./location/Address";

/**
 * Job interface includes:
 * @field role: string - the role of the contact at the company
 * @field company (required): string - the name of the company
 * @field startDate: Date - the date the contact started working at this company
 * @field endDate: Date - the date the contact stopped working at this company (assumed to be current if not specified)
 * @field location: Address - the location of the company
 * @field description: string 
 */
interface Job {
    role?: string | undefined;
    company: string;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    location?: Address | undefined;
    description?: string | undefined;
}

export default Job;