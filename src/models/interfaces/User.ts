import Address from "./Address";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    is_admin: boolean;
    address_id: Address;
}

export default User;