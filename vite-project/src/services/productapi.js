async function products() {

   try {
    let responseGetAll = await fetch("/api/Product/GetAll");
    if(!responseGetAll.ok){

        let result = await responseGetAll.json();
        return result;
    }
    else{
        let result = await responseGetAll.json();
        console.log(result.success)

        return result;
    }
   } catch (error) {
    console.log("Error... " + error);
   }
}

export async function productsDelte(id) {
    try {
         let response = await fetch(`/api/Product/Delete/${id}`,{
            method: "DELETE"
         });
    if(!response.ok){
        let result = await response.json();
        console.log("Error " + result.message);
    }
    else {
        let result = await response.json();
        console.log(result.message);
    }
    } catch (error) {
        console.log("Error al ejecutar la consulta " + error, + id);
    }
   
   
}

export default products;