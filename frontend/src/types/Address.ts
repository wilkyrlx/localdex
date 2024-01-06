
/**
 * Address interface includes: 
 * @field address (required): string - the address of the location // TODO: set format
 * @field description: string
 * @field coordinates: string // TODO: set format
 * @field startDate: Date - the date the contact started living at this address
 * @field endDate: Date - the date the contact stopped living at this address (assumed to be current if not specified)
 */
interface Address {
    address: string;        
    description?: string;   
    coordinates?: string; 
    startDate?: Date;
    endDate?: Date;
}

export default Address;