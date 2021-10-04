chrome.storage.sync.get('price',(a)=>{
  document.getElementById("price").innerText = a.price+"€";
});
