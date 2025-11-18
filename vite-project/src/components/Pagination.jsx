import { useEffect, useState } from "react";
import products from "../services/productapi";
function Pagination(){
const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function loadProducts (){
        let getproducts = await products();
        setData(getproducts);
    }
    loadProducts();
  }, []);

  const current = data[index];

  return (
    <div className="container text-center">
      <div className="row align-items-center">
        <div className="col">
            <p>Id</p>
          {current ? current.Id : "Cargando..."}
        </div>
        <div className="col">
            <p>Name</p>
          {current ? current.Name : ""}
        </div>
        <div className="col">
            <p>Price</p>
          {current ? current.Price : ""}
        </div>
         <div className="col">
            <p>fecha</p>
          {current ? current.CreatedAt : ""}
        </div>
        
        <div className="col">
          {current ? `Producto ${index + 1} de ${data.length}` : ""}
        </div>
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${index === 0 ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={() => setIndex(index - 1)}>Previous</a>
          </li>
          <li className={`page-item ${index === data.length - 1 ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={() => setIndex(index + 1)}>Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );

}
export default Pagination;