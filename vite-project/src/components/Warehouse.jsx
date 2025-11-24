import { useEffect, useState } from "react";
import warehouseGetAll, {
  warehouseCreate,
  warehouseUpdate,
} from "../services/warehouseapi";

function Warehouse() {
  const [dataWarehouse, setDataWarehouse] = useState([]);
  const [indexWarehouse, setIndexWarehouse] = useState(0);

  useEffect(() => {
    async function loadWarehouse() {
      try {
        let getWarehouse = await warehouseGetAll();
        setDataWarehouse(getWarehouse || []);
      } catch (error) {
        console.error("Backend apagado:", error);
        setDataWarehouse([]); // estado seguro
      }
    }
    loadWarehouse();
  }, []);

  const currentWarehouse = dataWarehouse[indexWarehouse];
  let createOnClick = async () => {
    let name = document.getElementById("NameW").value;
    let warehouse = {
      Name: name,
    };
    document.getElementById("NameW").value = "";
    await warehouseCreate(warehouse);
    let getWarehouse = await warehouseGetAll();
    setDataWarehouse(getWarehouse || []);
  };

  let updateOnClick = async () => {
    console.log("updateOnClick ejecutado");
    let nameInput = document.getElementById("Name");
    let idInput = document.getElementById("Id");
    console.log("refs:", nameInput, idInput);
    if (nameInput && idInput) {
      console.log("values:", nameInput.value, idInput.value);
    } else {
      console.error("No encontré los inputs");
    }
  };

  return (
    <>
      <h1>Warehouse</h1>
      <div className="row mb-3 warehouse">
        <h3>Create Warehouse</h3>
        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <input className="form-control" id="NameW" placeholder="Name"></input>
        </div>
        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => createOnClick()}
          >
            Create
          </button>
        </div>
      </div>
      <h2>List</h2>
      <div className="container text-center">
        <p className="">Pagination</p>

        <div className="row align-items-center">
          <div className="col">
            <p>Id</p>
            {currentWarehouse ? currentWarehouse.Id : "Cargando..."}
          </div>
          <div className="col">
            <p>Name</p>
            {currentWarehouse ? currentWarehouse.Name : "cargando"}
          </div>

          <div className="col">
            {currentWarehouse
              ? `Warehouse ${indexWarehouse + 1} de ${dataWarehouse.length}`
              : ""}
          </div>
        </div>

        {/*Pagination Products*/}
        {/*Pagination Products*/}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li
              className={`page-item ${indexWarehouse === 0 ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setIndexWarehouse(indexWarehouse - 1)}
              >
                Previous
              </button>
            </li>
            <li
              className={`page-item ${
                indexWarehouse === dataWarehouse.length - 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setIndexWarehouse(indexWarehouse + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
export default Warehouse;
