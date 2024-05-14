import Address from "./Address";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    address_id: Address;
}

export default User;