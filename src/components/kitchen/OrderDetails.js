import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function OrderDetails({ order }) {
  return (
    <div style={styles.container}>
      <h2>Platos de la orden</h2>
      {order.items && order.items.length > 0 ? (
        order.items.map((item, index) => (
          <Card title={item.name}
            // <Card title={
            // <div style={{justifyContent: 'space-between'}}>
            //   {item.name}
            //   <div style={styles.itemQuantity}>
            //     {item.quantity}
            //   </div>
            // </div>} 
            
            // footer={<div>
            //   <strong>Cantidad:</strong> {item.quantity}
            // </div>}
            key={index} style={styles.itemBox}>
            {/* <div style={styles.itemHeader}>
              <h3>{item.name}</h3>
                <div style={styles.itemQuantity}>
                <span>{item.quantity}</span>
              </div> 
            </div> */}
            <div style={styles.itemDescription}>
              <p>{item.description}</p>
              
              <p><strong>Precio:</strong> Bs. {item.price}</p>
              <p><strong>Cantidad:</strong> {item.quantity}</p>
            </div>
            <div style={styles.itemImage}>
              <img src={item.image} alt={item.name} style={styles.image} />
            </div>
          </Card>
        ))
      ) : (
        <p>No hay platos en este pedido.</p>
      )}

      <div style={styles.statusContainer}>
        {/* boton azul medio verde */}
        <Button severity='success'>
          {/*  style={styles.statusButton} */}
          {/* Pedido {order.status === 'Completado' ? 'Completado' : order.status} */}
          Marcar orden como completada
        </Button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '35%',
    // backgroundColor: '#f5f5f5',
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
    // padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    position: 'relative',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  itemQuantity: {
    backgroundColor: '#e0e0e0',
    borderRadius: '50%',
    padding: '5px 10px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
  },
  itemDescription: {
    // marginTop: '10px',
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
  statusButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};
