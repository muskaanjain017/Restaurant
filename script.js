async function getMenu(){
    
    const response = await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json");

    return response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
      const menus = await getMenu();
      const divContainer = document.getElementById('content');
      menus.forEach(menu => {
        const divElem = document.createElement('div');
        divElem.innerHTML +=`<image src='${menu.imgSrc}' height=300px width=300px>`;
        const paragraphElem = document.createElement('p');
        paragraphElem.innerText = `ID: ${menu.id} \n Name: ${menu.name} \n Price: ${menu.price}`;
        divElem.appendChild(paragraphElem);
        divContainer.appendChild(divElem);
      });

      new Promise(function TakeOrder(resolve, reject) {
        let order=[];
        for(let i=0;i<3;i++){
            order.push((menus[0].name));
        }
        
        setTimeout(() => resolve(order), 2500);
      
      }).then(function(result) {
      
        alert("You ordered : "+ result);
        return result;

      }).then(function(result){
        new Promise(function ordePrep(resolve, reject) {
            let order_status;
            let paid_status;
            let status={};
            if(result != null){
                order_status =true;
                paid_status = false;
                status ={"order_status":order_status,"paid_status":paid_status}
                setTimeout(() => resolve(status), 1500);
            }
            else{
                reject(status);
            } 
        }).then(function(status){
            alert("Order getting prepared\n"+ "Order Status: " + status.order_status +"\n" +"Paid Status: "+status.paid_status);
            return status;
      }).then(function(status){
        new Promise(function payOrder(resolve, reject) {
            status.paid_status = true;
            setTimeout(() => resolve(status), 1000);
      }).then(function(status){
        alert("Successfully paid \n"+"Order Status: " + status.order_status +"\n" +"Paid Status: "+status.paid_status);
        return status;
      }).then(function thankyouFnc(status){
        if(status.paid_status===true){
            alert("Thank you for eating with us today!");
        }
      }).catch(
        function errorValue(sttaus) {
            alert("Order not paid");
        }
    );
    }).catch(
        function errorValue(status) {
            alert("Please pay for the order");
        }
    );
    }).catch(
        function errorValue(status) {
            alert("Please select to order");
        }
    );
 } catch (e) {
      console.log(e);
    }
  });