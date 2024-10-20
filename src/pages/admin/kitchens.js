import React from "react";
import UserList from "@/components/admin/UserList";
import Loader from "@/components/misc/Loader";

import UserService from "@/service/UserService";
import KitchenSidebar from "@/components/kitchen/KitchenSidebar";
import { debounce } from "lodash";

const debouncedFetchUsers = debounce((searchTerm, setUsers) => {
    const userService = new UserService();
    userService.getKitchenUsers({
        pageNumber: 1,
        pageSize: 10,
        nameSearch: searchTerm,
    }).then((users) => {
        setUsers(users);
    });
}, 1500);

export default function KitchenAccountsPage() {
    const [users, setUsers] = React.useState([]);
    const [nameSearch, setNameSearch] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    const fetchUsers = React.useCallback(
        (searchTerm) => {
            setLoading(true);
            debouncedFetchUsers(searchTerm, (users) => {
                setUsers(users);
                setLoading(false);
            });
        },
        [] // No dependencies needed here
    );

    React.useEffect(() => {
        setLoading(true); // Show loader while fetching new data
        fetchUsers(nameSearch);
    }, [nameSearch, fetchUsers]);

    const handleSearchChange = (event) => {
        setNameSearch(event.target.value);
    };

    return (
        <KitchenSidebar>
            <div>
                <h1 style={styles.header}>Usuarios</h1>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={nameSearch}
                    onChange={handleSearchChange}
                    onFocus={(e) => e.target.style.outline = styles.searchBarActive.outline}
                    onBlur={(e) => e.target.style.outline = styles.searchBar.outline}
                    style={{
                        ...styles.searchBar,
                    }}
                />
                {loading ? <Loader /> : <UserList users={users} />}
            </div>
        </KitchenSidebar>
    );
}

const styles = {
    header: {
        fontSize: "25px",
        fontWeight: "bold",
    },
    searchBar: {
        width: "90%",
        fontSize: "21px",
        outline: "2px solid transparent",
        padding: "10px",
        marginLeft: "20px",
        marginRight: "20px",
    },
    searchBarActive: {
        outline: "2px solid #0000ff", // Change color as needed
    },
};
