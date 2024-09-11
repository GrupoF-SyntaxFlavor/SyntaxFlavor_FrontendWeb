export default function OrderDetails({ order }) {
  return (
    <div style={styles.container}>
      <h2>Platos del Pedido</h2>
      {order.items?.map((item, index) => (
        <div key={index} style={styles.item}>
          <div style={styles.itemDescription}>
            <h3>{item}</h3>
            <p>
              Cantidad: {order.quantity}
            </p>
            <p>Bs. {order.total}</p>
          </div>
          <div style={styles.itemImage}>
            {/* Imagen de referencia */}
            <img
              src="/sushi-icon.png"
              alt={item}
              style={styles.image}
            />
          </div>
        </div>
      ))}
      <div style={styles.statusContainer}>
        <button style={styles.completeButton}>
          Pedido {order.status === '✓' ? 'Completado' : 'En proceso'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '45%',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
  },
  itemDescription: {
    flex: '1',
  },
  itemImage: {
    width: '60px',
    height: '60px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  statusContainer: {
    textAlign: 'center',
    marginTop: '20px',
    fontWeight: 'bold',
  },
  completeButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
