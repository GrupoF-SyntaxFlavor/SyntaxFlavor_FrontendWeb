import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const imageMapping = {
  'Onigiris de Atún': 'https://images.pond5.com/pixel-sushi-vector-illustration-isolated-illustration-155825087_iconm.jpeg',
  'Cheesecake de Uvas': 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/vimdb/230649.jpg',
  'Tacos de Pollo': 'https://www.vvsupremo.com/wp-content/uploads/2017/06/Chicken-Tacos-900x570-sRGB.jpg',
  'Pizza de Pepperoni': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIoXjS-sXqWGIsMTB_m3av-Oh-Fgi93hBrzg&s',
  'Hamburguesa Clásica': 'https://img.freepik.com/fotos-premium/foto-stock-hamburguesa-clasica-aislada-blanco_940723-217.jpg',
  'Té Helado': 'https://imag.bonviveur.com/te-helado.jpg',
  'Pastel de Chocolate': 'https://i.pinimg.com/736x/42/36/b1/4236b10d070cb898106d84a6f2fa4a2c.jpg',
};

export default function OrderDetails({ order }) {
  return (
    <div style={styles.container}>
      <Card title={`Platos de la orden: ORD-${order.orderId}`} />
      <br />
      {order.orderItems && order.orderItems.length > 0 ? (
        order.orderItems.map((item, index) => (
          
          <Card title={item.menuItemName}
            key={index} style={styles.itemBox}>
              <p><strong>Precio:</strong> Bs. {item.price}</p>
              <p><strong>Cantidad:</strong> {item.quantity}</p>
            {/* <div style={styles.itemDescription}>
              <p>{item.description}</p>
              
            </div> */}
            <div style={styles.itemImage}>
              {/* <img src={item.image} alt={item.menuItemName} style={styles.image} /> */}
              <img 
                src={imageMapping[item.menuItemName]} 
                alt={item.menuItemName} 
                style={styles.image} 
              />
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
    borderLeft: '3px solid #ccc',
    paddingLeft: '2.5vh',
  },
  itemBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    border: '1px solid #ccc',
    // marginBottom: '10px',
    marginBottom: '1.4vh',
    borderRadius: '8px',
    backgroundColor: '#fff',
    position: 'relative',
  },
  itemImage: {
    width: '135px',
    height: '135px',
    position: 'absolute',
    bottom: '1.2vh',
    right: '2vh',
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
    marginTop: '2.5vh',
  },
};
