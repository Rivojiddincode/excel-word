import ProductTable from "./components/ProductTable";
import DownloadMenu from "./components/DowloadMenu";
import './App.css'
import products from "./data/product";

function App() {
  return (
    <div className="container">

      <h1>Products List</h1>

      <DownloadMenu products={products} />

      <ProductTable products={products} />

    </div>
  );
}

export default App;
