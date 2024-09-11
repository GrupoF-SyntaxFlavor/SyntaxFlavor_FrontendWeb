import OrderDetails from '@/components/OrderDetails.js';
import { useState } from 'react';

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
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(ordersMock);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  return (
    <div style={styles.container}>
      <div style={styles.listContainer}>
        <h2>Pedidos</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Mesa</th>
              <th>Cliente</th>
              <th>Total platillos</th>
              <th>Precio Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                style={selectedOrder?.id === order.id ? styles.selectedRow : styles.row}
                onClick={() => setSelectedOrder(order)}
              >
                <td>{index + 1}</td>
                <td>{order.table}</td>
                <td>{order.client}</td>
                <td>{order.totalDishes}</td>
                <td>Bs. {order.totalPrice}</td>
                <td>
                  {order.status === 'Completado' || order.status === 'Cancelado' ? (
                    order.status
                  ) : (
                    <div style={styles.statusButtons}>
                      <button
                        style={styles.completeButton}
                        onClick={(e) => {
                          e.stopPropagation(); // Evita que seleccionar el botón seleccione el pedido
                          handleCompleteOrder(order.id);
                        }}
                      >
                        ✔️
                      </button>
                      <button
                        style={styles.cancelButton}
                        onClick={(e) => {
                          e.stopPropagation(); // Evita que seleccionar el botón seleccione el pedido
                          handleCancelOrder(order.id);
                        }}
                      >
                        ❌
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.pagination}>
          <button>&lt; Anterior</button>
          <button>Siguiente &gt;</button>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetails order={selectedOrder} />
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContainer: {
    width: '50%',
    marginRight: '2%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  row: {
    cursor: 'pointer',
    borderBottom: '1px solid #ccc',
  },
  selectedRow: {
    cursor: 'pointer',
    backgroundColor: '#e0f7fa',
    borderBottom: '1px solid #ccc',
  },
  statusButtons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  completeButton: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '5px',
  },
  cancelButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '5px',
  },
  pagination: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
};
