var inputFile = "";
var result = "";

var isInputANSI = false;
var isOutputBOM = false;

$(function() {
  $('#inputFile').change(function(e) {
    inputFile = e.target.files[0];
    if (inputFile === null) {
      return;
    }
    getModes();
    parseCSV();
  });
});

function getModes() {
  // console.log($("input[type='radio']:checked", "#form_in_code").val());
  if ($("input[type='radio']:checked", "#form_in_code").val() === "ANSI") {
    isInputANSI = true;
  } else {
    isInputANSI = false;
  }
  // console.log($("input[type='radio']:checked", "#form_out_code").val());
  if ($("input[type='radio']:checked", "#form_out_code").val() === "BOM") {
    isOutputBOM = true;
  } else {
    isOutputBOM = false;
  }
}

function parseCSV() {
  var fileReader = new FileReader();
  fileReader.onload = function(e) {
    result = fileReader.result;
    afterFileReaderLoaded();
  };
  if (isInputANSI === true) {
    fileReader.readAsText(inputFile, 'big5');
  } else {
    fileReader.readAsText(inputFile);
  }
}

function afterFileReaderLoaded() {
  printResult();
  createDownloadButton();
}

function printResult() {
  $('#div_result').html(result);
}

function createDownloadButton() {
  var message;
  if (isOutputBOM === true) {
    message = "\uFEFF";
  }else{
    message = "";
  }

  message += "第一欄,第二欄,第三欄\n";
  message += result;

  const MIME_TYPE = 'text/csv';
  var blob = new Blob([message], {
    type: MIME_TYPE
  });
  var blobUrl = window.URL.createObjectURL(blob);
  var fileName = "myOutFile.csv";

  var $btn_downloadCSV = $('#btn_downloadCSV');
  $btn_downloadCSV.attr({
    href: blobUrl,
    download: fileName
  });

}
