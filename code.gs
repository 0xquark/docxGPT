// DROP DOWN MENU
function onOpen() {
 DocumentApp.getUi().createMenu("docxGPT")
 .addItem("Generate code in cpp", "generatecode")
 .addItem("Write pseudocode", "pseudocode")
 .addItem("Explain the code", "explaincode")
  .addToUi();
}
// ****END MENU****
 
// FIXED VARIABLES. Your API and Model Type
var apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
var model = "text-davinci-003"
// ****END VARIABLES****
 
function generatecode() {
var doc = DocumentApp.getActiveDocument()
var selectedText = doc.getSelection().getRangeElements()[0].getElement().asText().getText()
var body = doc.getBody()
var prompt = "write the code for this in c++ " + selectedText;
temperature= 0
maxTokens = 2060
  const requestBody = {
    "model": model,
    "prompt": prompt,
    "temperature": temperature,
    "max_tokens": maxTokens,
  };
  const requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+apiKey
    },
    "payload": JSON.stringify(requestBody)
  }
const response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", requestOptions);
var responseText = response.getContentText();
var json = JSON.parse(responseText);
Logger.log(json['choices'][0]['text'])
para = body.appendParagraph(json['choices'][0]['text'])
}

function pseudocode() {
var doc = DocumentApp.getActiveDocument()
var selectedText = doc.getSelection().getRangeElements()[0].getElement().asText().getText()
var body = doc.getBody()
var prompt = "write pseudocode for the following problem: " + selectedText;
temperature= 0
maxTokens = 2060
  const requestBody = {
    "model": model,
    "prompt": prompt,
    "temperature": temperature,
    "max_tokens": maxTokens,
  };
  const requestOptions = {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+apiKey
    },
    "payload": JSON.stringify(requestBody)
  }
const response = UrlFetchApp.fetch("https://api.openai.com/v1/completions", requestOptions);
var responseText = response.getContentText();
var json = JSON.parse(responseText);
Logger.log(json['choices'][0]['text'])
para = body.appendParagraph(json['choices'][0]['text'])
}
// ****END PROMPT****
 
 
 
function explaincode() {
var doc = DocumentApp.getActiveDocument()
 var selectedText = doc.getSelection().getRangeElements()[0].getElement().asText().getText()
 var body = doc.getBody()
 temperature= 0
 maxTokens = 2000
var prompt2 = "Explain the following code : " + selectedText;
   const requestBody2 = {
     "model": model,
    "prompt": prompt,
    "temperature": temperature,
    "max_tokens": maxTokens,
   };
   const requestOptions2 = {
     "method": "POST",
     "headers": {
       "Content-Type": "application/json",
       "Authorization": "Bearer "+apiKey
     },
     "payload": JSON.stringify(requestBody2)
   }
 const response2 = UrlFetchApp.fetch("https://api.openai.com/v1/images/generations", requestOptions2);
 var responseText = response2.getContentText();
 var json = JSON.parse(responseText);
 var url1=json['data'][0]['url']
 body.appendImage(UrlFetchApp.fetch(url1).getBlob());
}
// ****END IMAGE****
