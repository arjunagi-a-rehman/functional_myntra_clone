
let bagItems=JSON.parse(localStorage.getItem('bagItems'))||{};
let item_map = items.reduce((acc, item) => {
  acc[eval(item.id)] = item;
  return acc;
}, {});


loadAll();

function loadAll(){
  display_items_hompage();
  displayBagIcon();
}
function display_items_hompage(){
  let items_container=document.querySelector('.items-container');
  if(!items_container){
    return;
  }
  let newHtml='';
  Object.values(item_map).forEach((item)=>{
    console.log(item.id)
    newHtml+=`
              <div class="item-container">
                  <img src="${item.image}" class="item-image" alt="item image">
                  <div class="rating">
                      ${item.rating.stars} ⭐ | ${(item.rating.count)>=1000?item.rating.count/1000+'k':item.rating.count}
                  </div>
                  <div class="company-name">
                      ${item.company}
                  </div>
                  <div class="item-name">
                      ${item.item_name}
                  </div>
                  <div class="price">
                      <span class="current-price">
                          Rs ${item.current_price}
                      </span>
                      <span class="orignal-price">
                          Rs ${item.original_price}
                      </span>
                      <span class="discount">
                          (${item.discount_percentage}% OFF)
                      </span>
                  </div>`+(bagItems[eval(item.id)]?`
                  <div class="quantity" >
                    <button class="qualtity-button" onclick="decreaseQuentity(${item.id})">-</button>
                    <span class="item-quality">${bagItems[eval(item.id)]}</span>
                    <button class="qualtity-button" onclick="increaseQuantity(${item.id})">+</button>
                  </div>`:'')+`
                  <button class="btn-add-bag" onclick="addToBag(${item.id})">
                      Add to Bag
                  </button>
              </div>`
  })
  items_container.innerHTML=newHtml;
}
addToBag = (itemId)=>{
  bagItems[itemId]=bagItems[itemId]?bagItems[itemId]+1:1;
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadAll();
  displayBagIcon();
}
function displayBagIcon() {
  let bagItemCountElement = document.querySelector('.bag-item-count');
  if (Object.keys(bagItems).length > 0) {
    let count=0;
    console.log('I am here');
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerText = Object.keys(bagItems).length;
  } else {
    bagItemCountElement.style.visibility = 'hidden';
  }
}
function increaseQuantity(id){
  bagItems[id]++;
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadAll();
}
function decreaseQuentity(id){
  bagItems[id]--;
  if(bagItems[id]<=0)removeFromBag(id);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadAll();
}
function removeFromBag(itemId) {
  delete bagItems[itemId];
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadAll();
  
}