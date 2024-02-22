function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

// Use this code for Google Docs, Slides, Forms, or Sheets.
function onOpen() {
  var ui = SlidesApp.getUi(); 
      ui.createMenu('Sidebar')
      .addItem('Open', 'openSidebar')
      .addToUi();
}

function openSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('index');
  SlidesApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showSidebar(html);
}