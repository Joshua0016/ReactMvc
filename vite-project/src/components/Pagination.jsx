import { useEffect, useState } from "react";
import products, { productsDelte } from "../services/productapi";
import customers from "../services/customerapi";
function Pagination(){
  //hook pagination product
  const [dataProduct, setDataProduct] = useState([]);
  const [indexProduct, setIndexProduct] = useState(0);
  //hook pagination Customer
  const [dataCustomer, setDataCustomer] = useState([])
  const [indexCustomer, setIndexCustomer] = useState(0);

  useEffect(() => {
    async function loadDatabase (){
        let getproducts = await products();
        let getcusomers = await customers();

        setDataProduct(getproducts);
        setDataCustomer(getcusomers);
    }
    loadDatabase();
  }, []);

  //Product acual
  const currentProduct = dataProduct[indexProduct];
  //Customer actual
  const currentCustomer = dataCustomer[indexCustomer];
  const input = (id) => {
    
    productsDelte(id);
  }
  
  return (
    <> {/*Products*/}
      <div className="container text-center">
        <p>Products</p>
      <div className="row align-items-center">
        <div className="col">
            <p>Id</p>
          {currentProduct ? currentProduct.Id : "Cargando..."}
        </div>
        <div className="col">
            <p>Name</p>
          {currentProduct ? currentProduct.Name : ""}
        </div>
        <div className="col">
            <p>Price</p>
          {currentProduct ? currentProduct.Price : ""}
        </div>
         <div className="col">
            <p>fecha</p>
          {currentProduct ? currentProduct.CreatedAt : ""}
        </div>
        
        <div className="col">
          {currentProduct ? `Producto ${indexProduct + 1} de ${dataProduct.length}` : ""}
        </div>
      </div>
      {/*Pagination Products*/}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${indexProduct === 0 ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={() => setIndexProduct(indexProduct - 1)}>Previous</a>
          </li>
          <li className={`page-item ${indexProduct === dataProduct.length - 1 ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={() => setIndexProduct(indexProduct + 1)}>Next</a>
            
          </li>
        </ul>
        
      </nav>
      {/*Operación Delete*
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">Delete</span>
          <input onKeyDown={(e) => {if (e.key ==="Enter") input(e.target.value)}} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></input>
      </div>*/}
    </div>
    {/*Customer*/}
    <div className="container text-center">
     <div className="row align-items-center">
      <p>Customers</p>
        <div className="col">
      <p>Id</p>
      {currentCustomer ? currentCustomer.Id: "Cargando" }
       </div>
      <div className="col">
       <p>Name</p>
      {currentCustomer ? currentCustomer.Name : "Cargando"}
        </div>
      <div className="col">
        <p>Country</p>
      {currentCustomer ? currentCustomer.Country : "Cargando"}
        </div>
      <div className="col">
        <p>Region</p>
       {currentCustomer ? currentCustomer.Region : "Cargando"}
      </div>
     <div className="col">
      <p>City</p>
      {currentCustomer ? currentCustomer.City: "Cargando"}
      </div>
     <div className="col">
      <p>Address</p>
      {currentCustomer ? currentCustomer.Address : "Cargando"}
      </div>
     <div className="col">
      <p>Phone</p>
      {currentCustomer ? currentCustomer.Phone : "Cargando"}
      </div>
        <div className="col">
      <p>Postal code </p>
        {currentCustomer ? currentCustomer.PostalCode : "Cargando"}
      </div>
        <div className="col">
        {`Cliente ${indexCustomer +1} de ${dataCustomer.length}`}
      </div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
    
      <li className={`page-item ${indexCustomer === 0 ? "disabled" : ""}`}>
        <a className="page-link" href="#" onClick={() => setIndexCustomer(indexCustomer - 1)}>Previous</a></li>
       <li className={`page-item ${indexCustomer === dataCustomer.length -1 ? "disabled" : ""}`}>
        <a className="page-link" href="#" onClick={() => setIndexCustomer(indexCustomer + 1)}>Next</a></li>
  </ul>
</nav>
    </div>
    </>
  
  );

}
export default Pagination;