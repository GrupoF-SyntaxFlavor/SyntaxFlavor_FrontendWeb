import OrderDetails from '@/components/kitchen/OrderDetails.js';
// import SideBar from '@/components/kitchen/KitchenSidebar.js';
import { useState } from 'react';
import KitchenSiderBar from "@/components/kitchen/KitchenSidebar.js";

import React from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';

import 'primeicons/primeicons.css';

const ordersMock = [
  {
    id: 1,
    table: 12,
    client: 'xxx',
    totalDishes: 2,
    totalPrice: 58,
    status: 'En preparación',
    items: [
      { name: 'Cheesecake', description: 'Un postre único que combina la suavidad del cheesecake tradicional...', quantity: 2, price: 29, image:'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/230649.jpg' },
      { name: 'Sushi', description: 'Rollo de sushi con salmón fresco...', quantity: 1, price: 29, image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0749D9BC-260D-40F4-A07F-54814C4A82B4/Derivates/A73A7793-F3EE-4B90-ABA4-1CC1A0C3E18F.jpg' }
    ]
  },
  {
    id: 2,
    table: 5,
    client: 'xxx',
    totalDishes: 3,
    totalPrice: 29,
    status: 'Listo',
    items: [
      { name: 'Cheesecake', description: 'Un postre único que combina la suavidad del cheesecake tradicional...', quantity: 1, price: 29, image:'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/230649.jpg' }
    ]
  },
  {
    id: 3,
    table: 3,
    client: 'xxx',
    totalDishes: 3,
    totalPrice: 29,
    status: 'En preparación',
    items: [
      { name: 'Cheesecake', description: 'Un postre único que combina la suavidad del cheesecake tradicional...', quantity: 1, price: 29, image:'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/230649.jpg' },
      { name: 'Sushi', description: 'Rollo de sushi con salmón fresco...', quantity: 1, price: 29, image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0749D9BC-260D-40F4-A07F-54814C4A82B4/Derivates/A73A7793-F3EE-4B90-ABA4-1CC1A0C3E18F.jpg' },
      { name: 'Pastel de chocolate', description: 'Pastel de chocolate con relleno de fresa...', quantity: 1, price: 29, image: 'https://www.196flavors.com/wp-content/uploads/2014/10/sachertorte-3-FP.jpg' }
    ]
  },
  {
    id: 4,
    table: 8,
    client: 'xxx',
    totalDishes: 0,
    totalPrice: 0,
    status: 'En preparación',
    items: []
  },
  {id: 5, table: 8, client: 'xxx', totalDishes: 0, totalPrice: 0, status: 'En preparación', items: []},
  {id: 6, table: 8, client: 'xxx', totalDishes: 0, totalPrice: 0, status: 'En preparación', items: []},
  {id: 7, table: 8, client: 'xxx', totalDishes: 0, totalPrice: 0, status: 'En preparación', items: []},
  {id: 8, table: 8, client: 'xxx', totalDishes: 0, totalPrice: 0, status: 'En preparación', items: []},
  {id: 9, table: 8, client: 'xxx', totalDishes: 0, totalPrice: 0, status: 'En preparación', items: []},
  {id: 10, table: 8, client: 'xxx', totalDishes: 0, totalPrice: 0, status: 'En preparación', items: []},
  {id: 11, table: 8, client: 'xxx', totalDishes: 0, totalPrice: 0, status: 'En preparación', items: []},
  {id: 12, table: 8, client: 'xxx', totalDishes: 0, totalPrice: 0, status: 'En preparación', items: []},
  {id: 13, table: 8, client: 'xxx', totalDishes: 0, totalPrice: 0, status: 'En preparación', items: []},
];
export default function OrdersPage() {
  const [orders, setOrders] = useState(ordersMock);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [first, setFirst] = useState(0); // Control de paginación
  const [rows, setRows] = useState(10);  // Número de filas por página

  const handleCompleteOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: 'Completado' } : order
    );
    setOrders(updatedOrders);
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: 'Cancelado' } : order
    );
    setOrders(updatedOrders);
  };

  const statusBodyTemplate = (rowData) => {
    if (rowData.status === 'Completado' || rowData.status === 'Cancelado') {
      return rowData.status;
    } else {
      return (
        <div style={styles.statusButtons}>
          <Button
            icon="pi pi-check"
            // className="p-button-success p-button-rounded"
            rounded severity='success'
            onClick={(e) => {
              e.stopPropagation(); // Evita que seleccionar el botón seleccione el pedido
              handleCompleteOrder(rowData.id);
            }}
          />
          <Button
            icon="pi pi-times"
            // className="p-button-danger p-button-rounded"
            rounded severity='danger'
            // size='small'
            onClick={(e) => {
              e.stopPropagation();
              handleCancelOrder(rowData.id);
            }}
          />
        </div>
      );
    }
  };

  return (
    <KitchenSiderBar>
    <div style={styles.containerCard}>
      <h1>Órdenes del día</h1>
      <hr />
      <div style={styles.container}>
        <div style={styles.listContainer}>
          <h2>Órdenes</h2>

          <DataTable
            value={orders}
            selectionMode="single"
            selection={selectedOrder}
            onSelectionChange={(e) => setSelectedOrder(e.value)}
            dataKey="id"
            paginator={true}
            rows={rows}
            first={first}
            onPage={(e) => setFirst(e.first)}
          >
            <Column field="id" header="#" />
            <Column field="table" header="Mesa" />
            <Column field="client" header="Cliente" />
            <Column field="totalDishes" header="Total Platillos" />
            <Column field="totalPrice" header="Precio Total" body={(rowData) => `Bs. ${rowData.totalPrice}`} />
            <Column field="status" header="Estado" body={statusBodyTemplate} />
          </DataTable>

          {/* <Paginator
            first={first}
            rows={rows}
            totalRecords={orders.length}
            rowsPerPageOptions={[5, 10, 20]}
            onPageChange={(e) => {
              setFirst(e.first);
              setRows(e.rows);
            }}
          /> */}
        </div>

        {selectedOrder && (
          <OrderDetails order={selectedOrder} />
        )}
      </div>
    </div>
    </KitchenSiderBar>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    // backgroundColor: 'red',
  },
  listContainer: {
    width: '60%',
    marginRight: '2%',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    overflowY: 'auto',
    height: '0%',
  },
  statusButtons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  containerCard: {
    // backgroundColor: 'green',
    // padding: '20px',
    // borderRadius: '10px',
    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
};