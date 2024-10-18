import React from "react";
import UserList from "@/components/admin/userList";

import UserService from "@/service/UserService";
import KitchenSidebar from "@/components/kitchen/KitchenSidebar";
import { debounce } from "lodash";

export default function KitchenAccountsPage() {
    const [users, setUsers] = React.useState([]);
    const [nameSearch, setNameSearch] = React.useState("");

    const fetchUsers = React.useCallback(
        debounce((searchTerm) => {
            const userService = new UserService();
            userService.getKitchenUsers({
                pageNumber: 1,
                pageSize: 10,
                nameSearch: searchTerm,
            }).then((users) => {
                setUsers(users);
            });
        }, 15000),
        []
    );

    React.useEffect(() => {
        fetchUsers(nameSearch);
    }, [nameSearch, fetchUsers]);

    const handleSearchChange = (event) => {
        setNameSearch(event.target.value);
    };

    return (
        <KitchenSidebar>
            <div>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={nameSearch}
                    onChange={handleSearchChange}
                />
                <UserList users={users} />
            </div>
        </KitchenSidebar>
    );
}