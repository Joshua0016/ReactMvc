import { useEffect, useState } from "react";
import productsGetAll, {
  productsDelte,
  productsCreate,
  productsIsActive,
  productUpdate,
} from "../services/productapi";
function Product() {
  //hook pagination product
  const [dataProduct, setDataProduct] = useState([]);
  const [indexProduct, setIndexProduct] = useState(0);

  useEffect(() => {
    async function loadDatabase() {
      try {
        let getproducts = await productsGetAll();
        setDataProduct(getproducts || []);
      } catch (error) {
        console.log("Error... al cargar el backend");
        setDataProduct([]);
      }
    }

    loadDatabase();
  }, []);

  //Product acual
  const currentProduct = dataProduct[indexProduct];

  //evento create
  const createOnClick = async () => {
    let name = document.getElementById("Name").value;
    let price = document.getElementById("Price").value;
    let date = document.getElementById("Date").value;
    let stock = document.getElementById("Stock").value;
    let warehousesId = document.getElementById("Warehouse").value;
    let isActive = document.getElementById("IsActive").checked;

    let product = {
      Name: name,
      Price: price,
      CreatedAt: date,
      Stock: stock,
      WarehousesId: warehousesId,
      IsActive: isActive,
    };
    //limpiando campos
    ["Name", "Price", "Date", "Stock", "Warehouse"].forEach((id) => {
      document.getElementById(id).value = "";
    });
    document.getElementById("IsActive").checked = false;

    await productsCreate(product);
    let getproducts = await productsGetAll();
    setDataProduct(getproducts || []); //actualizando pagination al crear
  };
  //evento isActive
  const isActiveOnClick = async (e) => {
    let getIsActive = await productsIsActive(e.target.checked);
    setDataProduct(getIsActive || []); //actualizando activos / inactivos
  };
  //evento update
  const updateOnclick = async () => {
    let id = document.getElementById("IdUpdate").value;
    let name = document.getElementById("NameUpdate").value;
    let price = document.getElementById("PriceUpdate").value;
    let warehouse = document.getElementById("WarehouseUpdate").value;
    let stock = document.getElementById("StockUpdate").value;
    let date = document.getElementById("DateUpdate").value;
    let isActive = document.getElementById("IsActiveUpdate").checked;

    let update = {
      Id: id,
      Name: name,
      Price: price,
      WarehousesId: warehouse,
      CreatedAt: date,
      Stock: stock,
      IsActive: isActive,
    };
    [
      "IdUpdate",
      "NameUpdate",
      "PriceUpdate",
      "WarehouseUpdate",
      "StockUpdate",
      "DateUpdate",
    ].forEach((id) => {
      document.getElementById(id).value = "";
    });
    document.getElementById("IsActiveUpdate").checked = false;

    await productUpdate(update);
    let getProducts = await productsGetAll();
    setDataProduct(getProducts || []);
  };

  //Evento delete
  let deleteOnclick = async () => {
    let id = document.getElementById("IdDelete").value;
    document.getElementById("IdDelete").value = "";
    await productsDelte(id);
    let getProducts = await productsGetAll();
    setDataProduct(getProducts || []);
  };

  return (
    <>
      <h1>Products</h1>
      <div className="row mb-3">
        <h3>Create Product</h3>
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <input className="form-control" id="Name" placeholder="Name"></input>
        </div>
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Price
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="Price"
            placeholder="Price"
          ></input>
        </div>
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Date
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="Date"
            placeholder="yyyy-MM-dd"
          ></input>
        </div>
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Stock
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="Stock"
            placeholder="Stock"
          ></input>
        </div>
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Warehouse
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="Warehouse"
            placeholder="Warehouse Id"
          ></input>
        </div>

        <div className="col-sm-10">
          <input
            className="form-check-input is-invalid"
            type="checkbox"
            value=""
            id="IsActive"
            aria-describedby="invalidCheck3Feedback"
            required
          ></input>
          <label className="col-sm-10" htmlFor="invalidCheck3">
            IsActive
          </label>
        </div>

        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => createOnClick()}
          >
            Submit
          </button>
        </div>
      </div>
      {/*Products list*/}
      <h2>List</h2>
      <div className="container text-center">
        <p className="">Pagination</p>
        <div className="col-sm-10 checkbox">
          <input
            onClick={(e) => isActiveOnClick(e)}
            className="form-check-input is-invalid"
            type="checkbox"
            value=""
            id="IsActive"
            aria-describedby="invalidCheck3Feedback"
            required
          ></input>
          <label className="col-sm-10" htmlFor="invalidCheck3">
            IsActive
          </label>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <p>Id</p>
            {currentProduct ? currentProduct.Id : "Cargando..."}
          </div>
          <div className="col">
            <p>Name</p>
            {currentProduct ? currentProduct.Name : "cargando"}
          </div>
          <div className="col">
            <p>Price</p>
            {currentProduct ? currentProduct.Price : "cargando"}
          </div>
          <div className="col">
            <p>fecha</p>
            {currentProduct ? currentProduct.CreatedAt : "cargando"}
          </div>

          <div className="col">
            {currentProduct
              ? `Producto ${indexProduct + 1} de ${dataProduct.length}`
              : ""}
          </div>
        </div>
        {/*Pagination Products*/}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${indexProduct === 0 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setIndexProduct(indexProduct - 1)}
              >
                Previous
              </button>
            </li>
            <li
              className={`page-item ${
                indexProduct === dataProduct.length - 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setIndexProduct(indexProduct + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <h2>Update Products</h2>
      <div className="row mb-3">
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Id
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="IdUpdate"
            placeholder="Name"
          ></input>
        </div>
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="NameUpdate"
            placeholder="Name"
          ></input>
        </div>
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Price
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="PriceUpdate"
            placeholder="Price"
          ></input>
        </div>
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Date
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="DateUpdate"
            placeholder="yyyy-MM-dd"
          ></input>
        </div>
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Stock
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="StockUpdate"
            placeholder="Stock"
          ></input>
        </div>
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Warehouse
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="WarehouseUpdate"
            placeholder="Warehouse Id"
          ></input>
        </div>

        <div className="col-sm-10">
          <input
            className="form-check-input is-invalid"
            type="checkbox"
            value=""
            id="IsActiveUpdate"
            aria-describedby="invalidCheck3Feedback"
            required
          ></input>
          <label className="col-sm-10" htmlFor="invalidCheck3">
            IsActive
          </label>
        </div>

        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => updateOnclick()}
          >
            Update
          </button>
        </div>
      </div>
      {/*Delete♀*/}
      <h2>Delete Product</h2>
      <div className="row mb-3 delete">
        <p>Delete</p>
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Id
        </label>
        <div className="col-sm-10">
          <input
            className="form-control"
            id="IdDelete"
            placeholder="Id"
          ></input>
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => deleteOnclick()}
          >
            Delete
          </button>
        </div>
      </div>

      {/*Aquí termina Product*/}
      <hr></hr>
    </>
  );
}
export default Product;
