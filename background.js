
//store default values --------------------------------------------
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    name: "Default",
    tags: "Default",
    desc: "Default",
    tit: "Default",
    extratits: "Default",
    extra13: "Default",
    ttags: "Default",
    tdesc: "Default ",
    kw: "Default"
  });

  chrome.contextMenus.create({
    id: "trademark",
    title: "Search Trademarks for \"%s\"", 
    contexts: ["selection"], 
});

});

chrome.runtime.onConnect.addListener(port => {
  console.log('connected ', port);

  if (port.name === 'hi') {
    port.onMessage.addListener(this.processMessage);
  }
});


let value = "";


chrome.contextMenus.onClicked.addListener(function(info, tab){
  baseURL = "https://trademarks.justia.com/search?q=";
  var newURL = baseURL + info.selectionText;
  chrome.tabs.create({ url: newURL });
})


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)  ) { 
    chrome.scripting.insertCSS({
      target: {tabId: tabId},
      files: ["./stylesf.css"]     
    })
    .then(() => {
      chrome.scripting.executeScript({
        target: {tabId: tabId},
        files: ["./foreground.js"]
    })
    .then(() => {
      console.log('INJECTED');
    });
  })
    .catch(err => console.log(err));    
  }
});



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message.method);
  switch (message.method){
  case "set":
    value = message.value;
    sendResponse({value: null});
    
    break;
  case "get":
    sendAfterSet();
    
    break;
  case "clear":
    value = "";
    sendResponse({value: null});
    break;
  }
  return true;

  async function sendAfterSet(){
    for (let i = 0; i < 10; i++){
      if (value != ""){
        sendResponse({value: value})
        
        return;
      }
      console.log("Start Sleep 1s.");
      await new Promise(s => setTimeout(s, 1000));
      console.log("End Sleep 1s.");
    }
    value = "Error: Document information could not be obtained.";
  }
});



