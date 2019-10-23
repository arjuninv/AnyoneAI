window.webkitIndexedDB || window.msIndexedDB;
         window.IDBTransaction = window.IDBTransaction ||
         window.webkitIDBTransaction || window.msIDBTransaction;
         window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
         window.msIDBKeyRange

         if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
         }

         var db;
         var request = window.indexedDB.open("anyoneaiDB", 1);

         request.onerror = function(event) {
            console.log("error: ", event);
         };

         request.onsuccess = function(event) {
            db = request.result;
            console.log("success: "+ db);
         };
         request.onupgradeneeded = function(event) {
           var db = event.target.result;
           var objectStore = db.createObjectStore("anyoneai", {keyPath: "id"});
           objectStore.add({id: "projectName", data: ""});
         }


window.onload = function() {
    loadBlocks();
  
}

$(function(){
    $("#upload_link").on('click', function(e){
        e.preventDefault();
        $("#fileInput:hidden").trigger('click');
    });
});

$(function(){
    $("#continue_recent").on('click', function(e){
        e.preventDefault();
        $("#fileInput:hidden").trigger('click');
    });
});



function downloadCode() {
  Blockly.Python.INFINITE_LOOP_TRAP = null;
  var code = Blockly.Python.workspaceToCode(mainWorkspace);
  code = preprocess_code(code);
  var filename = sessionStorage.getItem('projectName');
  if (filename == 'null' || filename == null) {
    sessionStorage.projectName = "my_anyoneai_project";
  }
if (filename != null) {
  download(filename + ".py", code);
}
}

function parse(string, from, to) {
return string.split(from)[1].split(to)[0];
}



function preprocess_code(code) {
  var unp_code = code;
  var new_code = "";
  var  temp_import = "";
  while(unp_code.includes("{#add_to_top _") == 1) {
    temp_import = "{#add_to_top _" + parse(unp_code, "{#add_to_top _", "}") + "}";
    new_code += parse(unp_code, "{#add_to_top _", "}") + "\n";
    unp_code = unp_code.replace(temp_import, "");
}
return new_code + unp_code;
}

function saveBlocks() {
  var blocks = Blockly.Xml.workspaceToDom(mainWorkspace);
  var blocks_text = Blockly.Xml.domToText(blocks);
  sessionStorage.savedBlocks = blocks_text;
  refreshCodeDisp();
}

function refreshCodeDisp() {
  var code = Blockly.Python.workspaceToCode(mainWorkspace);
  code = preprocess_code(code);
  code_panel.innerHTML = code.replace(/\n/g, "<br />");
}


function loadBlocks() {
  mainWorkspace.clear()
  blocks_text = sessionStorage.getItem('savedBlocks');
  if (blocks_text != '' && blocks_text != null){
  var blocks = Blockly.Xml.textToDom(blocks_text);
  Blockly.Xml.domToWorkspace(blocks, mainWorkspace);
}
}

function sampleLoad(samplename) {
  $.ajax({
    url: "../sample/" + samplename + '.aai',
    success: function (data){
      sessionStorage.projectName = samplename;
      title.value = samplename;
      blocks_text = data;
        if (blocks_text != '' && blocks_text != null){
          mainWorkspace.clear()

        var blocks = Blockly.Xml.textToDom(blocks_text);
        Blockly.Xml.domToWorkspace(blocks, mainWorkspace);
      }
    }
  });
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

  function saveFile() {
  var blocks = Blockly.Xml.workspaceToDom(mainWorkspace);
  var blocks_text = Blockly.Xml.domToPrettyText(blocks);
  filename = sessionStorage.getItem('projectName');
  if (filename == 'null' || filename == null) {
    sessionStorage.projectName = "my_anyoneai_project";
  }
if (filename != null) {
  download(filename + ".aai", blocks_text)
}
}



function createPrj() {
  if (filename == 'null' || filename == null) {
    sessionStorage.projectName = "my_anyoneai_project";
  }
  var filename = prompt("Project name: ", sessionStorage.getItem('projectName'));
  sessionStorage.projectName = filename;

if (filename != null) {
  $('#welcomeModal').modal('hide')
  title.value = filename;
}

}

function storedb(tag, value) {
  var request = db.transaction(["anyoneai"], "readwrite")
 .objectStore("anyoneai")
 .add({ id: tag, data: value });
}


function getdb(tag) {
  var transaction = db.transaction(["anyoneai"]);
  var objectStore = transaction.objectStore("anyoneai");
  var request = objectStore.get(tag);

  request.onsuccess = function(event) {

     if(request.result) {
       return request.result.data;
     }

  };
}


window.onload = function () {
  loadBlocks();
};
