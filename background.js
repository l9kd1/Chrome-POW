class HTMLDigester{

  constructor(rawHTML){
    this.content = rawHTML.replace("&nbsp;"," ");
    this.priceRegexes = [/€ *([0-9,. ]+)/g,/([0-9,. ]+) *€/g];
  }

  get price(){
    var tab=[];
    this.priceRegexes.forEach((e)=>{
      var tmp = this.content.match(e);
      if(tab==[])tab=this.content.match(e);
      else if(tmp!=null)tab=tab.concat(this.content.match(e));
    });
    console.log(tab);
    tab = tab.map((e)=>{return e.replace(/€| /g,"");});
    tab = tab.filter((e)=>!Number.isNaN(e));
    tab = tab.map((e)=>{return parseInt(e);});
    tab = tab.filter((e)=>!Number.isNaN(e));
    return Math.max(...tab);
  }
}



chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    let dig = new HTMLDigester(request.source);
    console.log(dig.price);
    chrome.storage.sync.set({"price":dig.price});
  }
});
