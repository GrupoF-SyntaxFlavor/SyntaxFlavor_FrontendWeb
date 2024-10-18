import React from "react";
import UserList from "@/components/admin/userList";

import UserService from "@/service/UserService";
import KitchenSidebar from "@/components/kitchen/KitchenSidebar";

export default function KitchenAccountsPage(){
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        const userService = new UserService();
        userService.getKitchenUsers().then((users) => {
            setUsers(users);
        });
    }, []);

    return (
        <KitchenSidebar>
            <div>
                <UserList users={users} />
            </div>
        </KitchenSidebar>
    );
}