import Address from "./Address";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    address_id: Address;
}

export default User;