async function customers() {

    try {
        let response = await fetch("/api/Customer/GetAll");
        if(!response.ok){
        let result = await response.json();
        console.log(result.message, result.success);
        return result;
    }
    else{

        let result = response.json();
        return result;
    }
    } catch (error) {
        console.log("Error... " + error);
    }
    
}
export default customers;