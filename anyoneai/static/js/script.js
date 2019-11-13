window.onload = function() {
  loadBlocks();
  save_info = document.getElementById("save_info");
  code_panel = document.getElementById("code_panel");
  let searchParams = new URLSearchParams(window.location.search);
  $.get("../services/getXML?filename=" + searchParams.get("filename"), function(data) {
    if (data != "NO DATA") {
      let xml = Blockly.Xml.textToDom(data);
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    }
  });
  setInterval(saveXML, 2000);
};
var save_info;
var code_panel;
let saveStatus = false
function saveXML(){
  let searchParams = new URLSearchParams(window.location.search);
  let xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  if (saveStatus){
    save_info.innerHTML = "All changes saved";
    $.get("../services/saveXML?filename=" + searchParams.get("filename")+"&xml="+encodeURI(Blockly.Xml.domToText(xml)), function(data) {
      if (data != "SAVED"){
        
        console.log(data)
      }
    });
    saveStatus = false;
  }
  
}


function downloadCode() {
  let searchParams = new URLSearchParams(window.location.search);
  Blockly.Python.INFINITE_LOOP_TRAP = null;
  var code = Blockly.Python.workspaceToCode(mainWorkspace);
  code = preprocess_code(code);

  download(searchParams.get("filename") + ".py", code);
  
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

function code_disp() {
  Blockly.Python.INFINITE_LOOP_TRAP = null;
  var code = Blockly.Python.workspaceToCode(mainWorkspace);
  code = preprocess_code(code);
  code_panel.innerText = code;
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
  code_disp();
  save_info.innerHTML = "Saving...";
  saveStatus = true;
}