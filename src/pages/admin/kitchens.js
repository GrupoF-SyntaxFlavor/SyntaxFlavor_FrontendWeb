import React, { useState } from "react";
import UserList from "@/components/admin/UserList";
import Loader from "@/components/misc/Loader";
import UserService from "@/service/UserService";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { debounce } from "lodash";
import { Card } from 'primereact/card';
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
                <div style={styles.searchAndButtonContainer}>
                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={nameSearch}
                        onChange={handleSearchChange}
                        onFocus={(e) => e.target.style.outline = styles.searchBarActive.outline}
                        onBlur={(e) => e.target.style.outline = styles.searchBar.outline}
                        style={styles.searchBar}
                    />
                    <button onClick={handleCreateAccountClick} style={styles.createAccountButton}>
                        Crear Cuenta
                    </button>
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
        paddingTop: '10px',
        borderRadius: '10px',
    },
    header: {
        fontSize: "25px",
        fontWeight: "bold",
    },
    searchBar: {
        width: "90%", 
        height:"47px",
        fontSize: "20px",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "10px",
        marginRight: "10px", 
    },
    searchBarActive: {
        outline: "2px solid #0000ff", // Cambia el color si es necesario
    },
    createAccountButton: {
        width: "10%", 
        height:"45px",
        backgroundColor: "#86AB9A",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "20px",
        alignSelf: "center", 
    },
    searchAndButtonContainer: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "20px", // Añade un poco de espacio alrededor
    },
    loaderContainer: {
        display: "flex",
        justifyContent: "center",  // Centra horizontalmente
        alignItems: "center",       // Centra verticalmente
        height: "70vh",             // Ajusta el alto del contenedor para centrar verticalmente
    },
};
