export default function OrderDetails({ order }) {
  return (
    <div style={styles.container}>
      <h2>Platos del Pedido</h2>
      {order.items && order.items.length > 0 ? (
        order.items.map((item, index) => (
          <div key={index} style={styles.itemBox}>
            <div style={styles.itemHeader}>
              <h3>{item.name}</h3>
              <div style={styles.itemQuantity}>
                <span>{item.quantity}</span>
              </div>
            </div>
            <div style={styles.itemDescription}>
              <p>{item.description}</p>
              <p><strong>Cantidad:</strong> {item.quantity}</p>
              <p><strong>Precio:</strong> Bs. {item.price}</p>
            </div>
            <div style={styles.itemImage}>
              <img src={item.image} alt={item.name} style={styles.image} />
            </div>
          </div>
        ))
      ) : (
        <p>No hay platos en este pedido.</p>
      )}

      <div style={styles.statusContainer}>
        <button style={styles.statusButton}>
          Pedido {order.status === 'Completado' ? 'Completado' : order.status}
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
  itemBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    border: '1px solid #ccc',
    padding: '10px',
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
    marginTop: '10px',
  },
  itemImage: {
    width: '135px',
    height: '135px',
    position: 'absolute',
    bottom: '10px',
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
