async function productsGetAll() {
  try {
    let responseGetAll = await fetch("/api/Product/GetAll");
    if (!responseGetAll.ok) {
      console.log("Error al realizar la petición");
    } else {
      let result = await responseGetAll.json();
      return result;
    }
  } catch (error) {
    console.log("Error... " + error);
  }
}

export async function productsCreate(product) {
  try {
    let response = await fetch("/api/Product/Create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      let result = await response.json();
      alert(`${result.success} - ${result.message}`);
    } else {
      let result = await response.json();
      alert(`${result.success} - ${result.message}`);
    }
  } catch (error) {
    console.log("Error atrapado en el try catch" + error);
  }
}
export async function productsIsActive(IsActive) {
  try {
    console.log(IsActive);
    let response = await fetch(`/api/Product/IsActive?IsActive=${IsActive}`, {
      method: "GET",
    });
    let result = await response.json();
    return result;
  } catch (error) {
    console.log("Error en el try catch de productIsActive" + error);
  }
}
export async function productUpdate(product) {
  try {
    let response = await fetch("/api/Product/Update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      let result = await response.json();
      alert(`Error ${result.success} - ${result.message}`);
      console.log("Error al actualizar los datos");
    } else {
      let result = await response.json();
      alert(`Éxito ${result.success} - ${result.message}`);
    }
  } catch (error) {
    console.log("Error al actualizar los datos... try catch " + error);
  }
}
export async function productsDelte(id) {
  try {
    let response = await fetch(`/api/Product/Delete/?id=${id}`, {
      method: "POST",
    });
    if (!response.ok) {
      let result = await response.json();
      alert("Error " + result.message);
    } else {
      let result = await response.json();
      alert(result.message);
    }
  } catch (error) {
    console.log("Error al ejecutar la consulta " + error);
  }
}

export default productsGetAll;
