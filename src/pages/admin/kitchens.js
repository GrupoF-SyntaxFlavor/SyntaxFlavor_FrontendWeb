import React, { useState } from "react";
import UserList from "@/components/admin/UserList";
import Loader from "@/components/misc/Loader";
import UserService from "@/service/UserService";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { debounce } from "lodash";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router'; 


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
    const router = useRouter();  
    const [users, setUsers] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const fetchUsers = React.useCallback(
        (searchTerm) => {
            setLoading(true);
            debouncedFetchUsers(searchTerm, (users) => {
                setUsers(users);
                setLoading(false);
            });
        },
        [] // No dependencies needed aquí
    );

    React.useEffect(() => {
        setLoading(true); // Mostrar loader mientras se buscan los datos
        fetchUsers(nameSearch);
    }, [nameSearch, fetchUsers]);

    const handleSearchChange = (event) => {
        setNameSearch(event.target.value);
    };

    const handleCreateAccountClick = () => {
        router.push("/admin/kitchen-account-form");

    };

    return (
        <AdminSidebar>
            <div style={styles.container}>
                <Card title="Usuarios"></Card>
                <div style={styles.searchAndButtonContainer} className="flex align-items-center gap-2 mb-3">
                    <InputText
                        value={nameSearch}
                        onChange={handleSearchChange}
                        placeholder="Buscar por nombre111"
                        className="w-full"
                        // style={styles.searchBar}
                    />
                    <Button 
                        label="Crear cuenta" 
                        onClick={handleCreateAccountClick} 
                        className="p-button-success"
                        style={styles.createAccountButton}
                    />
                </div>

                {loading ? (
                    <div style={styles.loaderContainer}>
                        <Loader />
                    </div>
                ) : (
                    <UserList users={users} />
                )}

            </div>
        </AdminSidebar>
    );
}

const styles = {
    container: {
        paddingTop: '18px',
        borderRadius: '10px',
    },
    header: {
        fontSize: "25px",
        fontWeight: "bold",
    },
    // searchBar: {
    //     width: "90%", 
    //     height:"47px",
    //     fontSize: "20px",
    //     border: "1px solid #ccc",
    //     padding: "10px",
    //     borderRadius: "10px",
    //     marginRight: "10px", 
    // },
    // searchBarActive: {
    //     outline: "2px solid #0000ff", // Cambia el color si es necesario
    // },
    createAccountButton: {
        width: "10%", 
        height:"45px",
        // backgroundColor: "#86AB9A",
        // color: "white",
        
        // border: "none",
        // borderRadius: "10px",
        // cursor: "pointer",
        // fontSize: "20px",
        // alignSelf: "center",
        padding: "0px", 
    },
    searchAndButtonContainer: {
        display: "flex",
        marginBottom: "3px",
        paddingTop: "15px",
        // justifyContent: "flex-start",
        alignItems: "center",
    },
    loaderContainer: {
        display: "flex",
        justifyContent: "center",  // Centra horizontalmente
        alignItems: "center",       // Centra verticalmente
        height: "70vh",             // Ajusta el alto del contenedor para centrar verticalmente
    },
};
