async function warehouseGetAll() {
  try {
    let response = await fetch("/api/Warehouse/GetAll");

    if (!response.ok) {
      console.log(`Error al realizar la consulta`);
    } else {
      let result = response.json();
      return result;
    }
  } catch (error) {
    console.log("Error try catch" + error);
  }
}
export async function warehouseCreate(warehouse) {
  try {
    let response = await fetch("/api/Warehouse/Create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(warehouse),
    });
    if (!response.ok) {
      let result = await response.json();
      alert(`Error ${result.message}`);
    } else {
      let result = await response.json();
      alert(`exito ${result.message}`);
    }
  } catch (error) {
    console.log("Error try catch create warehouse" + error);
  }
}
export async function warehouseUpdate(entity) {
  try {
    let response = await fetch("/api/Warehouse/Update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entity),
    });
    if (!response.ok) {
      let result = await response.json();

      alert(result.message);
    } else {
      let result = await response.json();
      alert(result.message);
    }
  } catch (error) {
    console.log("Error try catch Update" + error);
  }
}
export default warehouseGetAll;
