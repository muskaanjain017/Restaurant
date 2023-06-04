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
            if(result != null){
                order_status =true;
                paid_status = false;
            }
            let status ={"order_status":order_status,"paid_status":paid_status}

            setTimeout(() => resolve(status), 1500);
        }).then(function(status){
            alert("Order Status: " + status.order_status +"\n" +"Paid Status: "+status.paid_status);
            return status;
      }).then(function(status))
    });
    } catch (e) {
      console.log(e);
    }
  });