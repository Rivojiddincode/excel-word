function ProductTable({ products }) {
  const totalPrice = products.reduce((sum, item) => sum + item.price, 0);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Product</th>
          <th>Category</th>
          <th>Price ($)</th>
        </tr>
      </thead>

      <tbody>
        {products.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>${item.price}</td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={3}>Total Price</td>
          <td>${totalPrice}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default ProductTable;
