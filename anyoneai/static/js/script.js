window.onload = function() {
  loadBlocks();
  let searchParams = new URLSearchParams(window.location.search);
  $.get("../services/getXML?file=" + searchParams.get("file"), function(data) {
    if (data != "NO DATA") {
      let xml = Blockly.Xml.textToDom(data);
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    }
  });
  setInterval(saveXML, 10000);
};

let blocksChanged = false
function saveXML(){
  let searchParams = new URLSearchParams(window.location.search);
  let xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  if (blocksChanged){
    $.get("../services/saveXML?file=" + searchParams.get("file")+"&xml="+encodeURI(Blockly.Xml.domToText(xml)), function(data) {
      if (data != "SAVED"){
        console.log(data)
      }
    });
    blocksChanged = false;
  }
  
}

$(function() {
  $("#upload_link").on("click", function(e) {
    e.preventDefault();
    $("#fileInput:hidden").trigger("click");
  });
});

$(function() {
  $("#continue_recent").on("click", function(e) {
    e.preventDefault();
    $("#fileInput:hidden").trigger("click");
  });
});

function downloadCode() {
  Blockly.Python.INFINITE_LOOP_TRAP = null;
  var code = Blockly.Python.workspaceToCode(mainWorkspace);
  code = preprocess_code(code);
  var filename = sessionStorage.getItem("projectName");
  if (filename == "null" || filename == null) {
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
  var temp_import = "";
  while (unp_code.includes("{#add_to_top _") == 1) {
    temp_import =
      "{#add_to_top _" + parse(unp_code, "{#add_to_top _", "}") + "}";
    new_code += parse(unp_code, "{#add_to_top _", "}") + "\n";
    unp_code = unp_code.replace(temp_import, "");
  }
  return new_code + unp_code;
}

function loadBlocks() {
  mainWorkspace.clear();
}

function download(filename, text) {
  var pom = document.createElement("a");
  pom.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  pom.setAttribute("download", filename);

  if (document.createEvent) {
    var event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}

function saveFile() {
  var blocks = Blockly.Xml.workspaceToDom(mainWorkspace);
  var blocks_text = Blockly.Xml.domToPrettyText(blocks);
  filename = sessionStorage.getItem("projectName");
  if (filename == "null" || filename == null) {
    sessionStorage.projectName = "my_anyoneai_project";
  }
  if (filename != null) {
    download(filename + ".aai", blocks_text);
  }
}
function saveBlocks() {
  blocksChanged = true;
}


function createPrj() {
  if (filename == "null" || filename == null) {
    sessionStorage.projectName = "my_anyoneai_project";
  }
  var filename = prompt(
    "Project name: ",
    sessionStorage.getItem("projectName")
  );
  sessionStorage.projectName = filename;

  if (filename != null) {
    $("#welcomeModal").modal("hide");
    title.value = filename;
  }
}
