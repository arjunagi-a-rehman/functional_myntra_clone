const CONVENIENCE_FEES = 99;
let bagItemObjects={};
onLoad();

function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector('.bag-summary');

  let totalItem = bagItemObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  for(let bagItem in bagItemObjects){
    let quantity=bagItemObjects[bagItem];
    bagItem=JSON.parse(bagItem);
    totalMRP += bagItem.original_price*quantity;
    totalDiscount += bagItem.original_price*quantity - bagItem.current_price*quantity;
  }
  let conv=totalMRP>0?CONVENIENCE_FEES:0;
  let finalPayment = totalMRP - totalDiscount + conv;
  
  
  bagSummaryElement.innerHTML = `
    <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">${conv}</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹${finalPayment}</span>
    </div>
  </div>`+((finalPayment>0)?`
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
  `:`
  <button class="gray-btn-place-order {
    " style=background-color:gray cursor: default>
    <div class="css-xjhrni" >PLACE ORDER</div>
  </button>
  `);
}

function loadBagItemObjects() {
  bagItemObjects={};
  for(let id in bagItems){
    bagItemObjects[JSON.stringify(item_map[id])]=bagItems[id];
  }
}

function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  for(let items in bagItemObjects){
    innerHTML += generateItemHTML(JSON.parse(items),bagItemObjects[items]);
  }
  
  containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId) {
  delete bagItems[itemId];
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  onLoad()
  displayBagIcon();
  
}
function increaseQuantity(id){
  bagItems[id]++;
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  onLoad()
  displayBagIcon();
  displayBagSummary()
}
function decreaseQuentity(id){
  bagItems[id]--;
  if(bagItems[id]<=0)removeFromBag(id);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  onLoad()
  displayBagIcon();
  displayBagSummary()
}

function generateItemHTML(item,qual) {
  return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
        <div class="quantity" >
                <button class="qualtity-button" onclick="decreaseQuentity(${item.id})">-</button>
                <span class="item-quality">${qual}</span>
                <button class="qualtity-button" onclick="increaseQuantity(${item.id})">+</button>

              </div>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`;
}