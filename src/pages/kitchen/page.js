import OrderDetails from '@/components/OrderDetails.js';

import { useState } from 'react';

const ordersMock = [
  { id: 1, table: 12, total: 58, items: ['Cheesecake', 'Sushi'], quantity: 2, status: 'En preparación' },
  { id: 2, table: 5, total: 29, items: ['Cheesecake'], quantity: 1, status: 'Listo' },
  { id: 3, table: 8, total: 45, items: ['Cheesecake', 'Tempura'], quantity: 3, status: 'Completado' },
];

export default function page() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div style={styles.container}>
      <div style={styles.listContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {ordersMock.map((order) => (
              <tr
                key={order.id}
                style={selectedOrder?.id === order.id ? styles.selectedRow : styles.row}
                onClick={() => setSelectedOrder(order)}
              >
                <td>{order.table}</td>
                <td>Bs. {order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.pagination}>
          <button>&lt; Anterior</button>
          <button>Siguiente &gt;</button>
        </div>
      </div>

      {selectedOrder && <OrderDetails order={selectedOrder} />}
    </div>
  );
}

const styles = {
  container: {
    // backgroundColor: '#f5f5f5',
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
  pagination: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
};
