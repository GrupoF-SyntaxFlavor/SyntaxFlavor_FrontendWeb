import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function OrderDetails({ order }) {
  return (
    <div style={styles.container}>
      <h2>Platos de la orden</h2>
      {order.orderItems && order.orderItems.length > 0 ? (
        order.orderItems.map((item, index) => (
          <Card title={item.menuItemName}
            key={index} style={styles.itemBox}>
            <div style={styles.itemDescription}>
              <p>{item.description}</p>
              <p><strong>Precio:</strong> Bs. {item.price}</p>
              <p><strong>Cantidad:</strong> {item.quantity}</p>
            </div>
            <div style={styles.itemImage}>
              <img src={item.image} alt={item.menuItemName} style={styles.image} />
            </div>
          </Card>
        ))
      ) : (
        <p>No hay platos en este pedido.</p>
      )}

      <div style={styles.statusContainer}>
        <Button severity='success'>
          Marcar orden como completada
        </Button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '35%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    border: '1px solid #ccc',
    marginBottom: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    position: 'relative',
  },
  itemDescription: {
  },
  itemImage: {
    width: '135px',
    height: '135px',
    position: 'absolute',
    bottom: '40px',
    right: '10px',
    borderRadius: '80px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  statusContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
};
