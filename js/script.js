"use strict";

const CategorieParent = document.querySelector('.CateItems');
const ProductParent = document.querySelector('.productList');
var obj;
var objSize;

const input = document.querySelector('#input');



document.addEventListener("DOMContentLoaded", function() { 
    if(document.getElementById("page1-content")) {  
        
    fetch('js/categories.json')
    .then((res) => {
        return res.json();
    })
    .then((data) => { 
        renderCategories(data);
        obj=data;
    })
    .catch((error) => {
        console.error("Unable to fetch data:", error);
    })

    fetch('js/products.json')
    .then((res) => {
        return res.json();
    })
    .then((data) => { 
        obj=data;
        objSize=obj.length;
        console.log(objSize)
        renderProducts(data,8);
        
        

        
    })
    .catch((error) =>
        console.error("Unable to fetch data:", error));

     } 
    else if (document.getElementById("page2-content")) { 

        fetch('js/products.json')
    .then((res) => {
        return res.json();
    })
    .then((data) => { 
        obj=data;
        objSize=obj.length;
        renderProducts(data,objSize);
        
        
        

        
    })
    .catch((error) => {
        console.error("Unable to fetch data:", error);

     } )
         
         } });


   
    


    

function renderCategories(data) {


    data.forEach(data => {

        
        const catDiv = document.createElement('div');
        catDiv.classList.add('item');

        const catImage = document.createElement('img');
        catImage.src = data.img;
        catImage.alt = data.name;

        const catName = document.createElement('p');
        catName.textContent = data.name;

        catDiv.appendChild(catImage);
        catDiv.appendChild(catName);
        CategorieParent.appendChild(catDiv);
        
    }); 
     
  }
 
    

  function renderProducts(data,l) {
    ProductParent.innerHTML = '';
    
    let query = input.value.toLowerCase();
    let renderData = data;
    if(query !== ""){
        renderData = [];
        console.log(renderData)
        let count = 0;
        for(let k of data) {
            if(k.name.toLowerCase().includes(query)) {
                console.log(k.name)
                renderData[count] =  k;
                count++;
            }
        }
    }
    if(renderData.length != 0){
      for(let i=0;i<l;i++){
        
          
          const productDiv = document.createElement('div');
          productDiv.classList.add('product');
  
          productDiv.innerHTML = `<div class="top">
          ${renderData[i].offer ? `<div class="offer">
              <span style="color: #fdfdfd;">-${renderData[i].offer}%</span>
          </div>`: ""}
          ${renderData[i].new ? "<img src='images/New Button.png' class='new' alt='new'></img>":" " }
                          <img src="${renderData[i].img}" class="product-image" alt="${renderData[i].name}">
                          <div>
                              <div class="white-round">
                                  <img src="images/wishlist.svg" alt="wishlist" class="icon">
                              </div>
                              <div style="top: 25%;" class="white-round">
                                  <img src="images/Quick View.svg" alt="QuickView" class="icon">
                              </div>
                      
                              
                          </div>
                          <div class="addTocart">
                              <span>Add To Cart</span>
                          </div>
  
                      </div>
                      <div class="bottom">
                          <h6>${renderData[i].name}</h6>
                          ${renderData[i].offer ? `<span>$${renderData[i].price-(renderData[i].price/100)*renderData[i].offer}</span> <span style='text-decoration-line: line-through;color:#000;opacity:0.3;'>$${renderData[i].price}</span>`: `<span>$${renderData[i].price}</span>`  }
                          
                          <div class="rating">
                              
                              ${renderRating(renderData[i].rating)}
                              
                              <span style="opacity: 0.3;color:black">(${renderData[i].totalRatongs})</span>
  
                          </div>
  
                      </div>
  `
  
          // const productDivTop = document.createElement('div');
  
          // productDivTop.classList.add('top');
  
          // productDivTop.innerHTML = `<img src="${data[i].img}" alt="${data[i].name}">`;
  
          ProductParent.appendChild(productDiv);
      }
          
      }
    }
  
      function renderRating(rating){
          let ratingHtml = '';
          let count = 0;
          for(let i=1;i<=Math.trunc(rating);i++){
              
              ratingHtml += `<img src="images/YellowStar.svg" alt="Camera">`;
              count++;
          }
          if(rating-Math.trunc(rating) >= .5){
              ratingHtml += `<img src="images/star-half-filled.svg" alt="Camera">`;
              count++;
          }
          for(let i=1;i<=5-count;i++){
              
              ratingHtml += `<img src="images/greyStar.svg" alt="Camera">`;
          }
          return ratingHtml;
      }
 
      
      function viewButtonClick(){
        
        location.href = "product-list.html";
        console.log(objSize)
        renderProducts(obj,objSize)
        
      }
input.addEventListener("input", ()=> {
    renderProducts(obj,objSize);
})