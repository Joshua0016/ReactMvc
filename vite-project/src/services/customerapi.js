async function customers() {
  try {
    let response = await fetch("/api/Customer/GetAll");
    if (!response.ok) {
      console.log("Error al realizar la consulta Customer....");
    } else {
      let result = response.json();
      return result;
    }
  } catch (error) {
    console.log("Error... " + error);
  }
}
export default customers;
