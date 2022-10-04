// yom.js
//document.getElementById('connected').addEventListener("click", isConnected);

let options = {
    method: 'GET',
    credentials: 'include'
}

async function isConnected() {
    url="https://edenred.sciforma.net/sciforma/"
    
    try {
      const response = await fetch(url,options)
      let body = await response.text();

      var regex = /<meta name="sciforma-logged-in" content="true" \/>/i;
      var found = body.match(regex);
      if (found!=null) {
        var connected=true;
      } else {
        var connected=false;
      }
      console.log('connected: ', connected);
      // là on fait qqch avec notre réponse
      if (connected==true){
        document.getElementById("result").innerHTML = connected;
      } else {
        document.getElementById("result").innerHTML += "vous n'&ecirc;tes pas connect&eacute;, vous allez &ecirc;tre redirig&eacute; ...";
        chrome.tabs.update({url: "https://edenred.sciforma.net/sciforma/"});
      }
      
    } catch (err) {
      console.log("erreur");
      console.log(err);
    }
    return connected;
}

isConnected()