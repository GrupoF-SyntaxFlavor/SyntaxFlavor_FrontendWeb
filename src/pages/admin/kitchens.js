import React, { useState, useContext } from "react";
import UserList from "@/components/admin/UserList";
import Loader from "@/components/misc/Loader";
import UserService from "@/service/UserService";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { debounce } from "lodash";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router'; 
import withAuth from "@/components/misc/withAuth";
import { UserContext } from '../../../context/UserContext';


// const debouncedFetchUsers = debounce((pageNumber, pageSize, setUsers, authToken) => {
//     const userService = new UserService();
//     console.log('parametros:', pageNumber, pageSize, authToken); // Verifica que los parámetros son correctos aquí
//     userService.getKitchenUsers2({
//         pageNumber, // Usa la variable, no el string '0'
//         pageSize, // Usa la variable, no el string '10'
//         sortBy: 'name',
//         sortOrder: 'asc',
//         authToken
//     }).then(users => {
//         setUsers(users);
//     }).catch(error => {
//         console.error('Failed to fetch users:', error);
//     });
// }, 1500);


function KitchenAccountsPage() {
    //contexts
    const {
        kitchenUsers, 
        loadKitchenUsers, 
        first,
        setFirst,
        rows,
        setRows, 
        totalPages, 
        setTotalPages,
        page,
        setPage,
        sortBy,
        setSortBy,
        sortOrder, 
        setSortOrder,
    } = useContext(UserContext)

    const router = useRouter();  
    const [users, setUsers] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalRecords, setTotalRecords] = useState(110);

    // const totalPages = Math.ceil(totalRecords / 10);
    
    // const [page, setPage] = useState(0);
    // const [rows, setRows] = useState(10);
    // console.log('authToken:', authToken);

    const fetchUsers = React.useCallback(async () => {
        setLoading(true);
        try {
            const userService = new UserService();
            const data = await userService.getKitchenUsers2({
                pageNumber: page,
                pageSize: rows,
                sortBy: 'name',
                sortOrder: 'asc',
                authToken
            });
            console.log("Users fetched:", data);  // Verifica que los usuarios se reciben correctamente
            // Evitar re-renderizar si no hay cambios en los datos
            if (JSON.stringify(data.content) !== JSON.stringify(users)) {
                setUsers(data.content);  // Solo actualizar si los datos son diferentes
            }
            setTotalRecords(data.totalElements);  // Total de registros para la paginación
    
            // Verificar si estamos en la última página
            const isLastPageCheck = page + rows >= data.totalElements;
            setIsLastPage(isLastPageCheck);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setError(error.message || "Failed to load data");
        }
        setLoading(false);
    }, [page, rows, authToken]);
    
    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    
    

    const onPaginate = (event) => {
        setPage(event.page);
        setRows(event.rows);
    };

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
                        placeholder="Buscar por nombre..."
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
                    // <UserList users={users} />
                    // <UserList users={users} onPaginate={onPaginate} page={page} rows={rows} loading={loading} />
                    <UserList 
                        users={users} 
                        onPaginate={onPaginate} 
                        page={page} 
                        rows={rows} 
                        loading={loading}
                        totalPages={totalPages}
                    />

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

export default withAuth(KitchenAccountsPage);