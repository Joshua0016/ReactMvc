async function products() {

   try {
    let response = await fetch("/api/Product/GetAll");
    if(!response.ok){
        let result = await response.json();
        console.log(result.message, result.success, result.status);
        return result;
    }
    else{
        let result = await response.json();

        return result;
    }
   } catch (error) {
    console.log("Error... " + error);
   }
}
async function productGet() {
    
}
export default products;