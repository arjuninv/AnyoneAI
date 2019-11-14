var filename;
var save_info;
var code_panel;
let saveStatus = false;
let pycode = "";
var terminal_panel;
var code_container;
var terminal_container;



window.onload = function() {
  loadBlocks();
  let searchParams = new URLSearchParams(window.location.search);
  code_container = document.getElementById("code_container");
  terminal_container = document.getElementById("terminal_container");
  filename = searchParams.get("filename")
  save_info = document.getElementById("save_info");
  code_panel = document.getElementById("code_panel");
  terminal_panel = document.getElementById("terminal_panel");
  $.get("../services/getXML?filename=" + filename , function(data) {
    if (data != "NO DATA") {
      let xml = Blockly.Xml.textToDom(data);
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    }
  });
  setInterval(saveXML, 2000);
};

function saveXML(){
  let xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
  let json = {"filename": filename, "xml": xml};
  let xmlhttp = new XMLHttpRequest();
  if (saveStatus){
    xmlhttp.open("POST", "../services/saveXML?file="+filename)
    save_info.innerHTML = "All changes saved";
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(xml);
  };
  saveStatus = false;
}


function downloadCode() {
  Blockly.Python.INFINITE_LOOP_TRAP = null;
  var code = Blockly.Python.workspaceToCode(mainWorkspace);
  code = preprocess_code(code);

  download(filename + ".py", code);
  
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

function save_py_code(){
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "../services/saveCode?file="+filename)
  xmlhttp.send(pycode);
}

function code_disp() {
  Blockly.Python.INFINITE_LOOP_TRAP = null;
  var code = Blockly.Python.workspaceToCode(mainWorkspace);
  pycode = preprocess_code(code);

  code_panel.innerText = pycode;
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
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });  save_info.innerHTML = "Saving...";
  saveStatus = true;
}

function toggle_theme() {
  var theme_sheet = document.getElementById('theme_sheet');
  var dark = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/tomorrow-night-blue.min.css';
  var light = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css';
  var icons = document.getElementsByClassName('code-button');

  if(theme_sheet.href == dark){
    theme_sheet.href = light;
    for(i = 0; i < icons.length; i++) {
      icons[i].style.color = 'black';
    }
  } else {
    theme_sheet.href = dark;
    for(i = 0; i < icons.length; i++) {
      icons[i].style.color = 'white';
    }
  }
}


function copy_code() {
  $('.toast').toast("show");

  if (document.selection) { 
      var range = document.body.createTextRange();
      range.moveToElementText(code_panel);
      range.select().createTextRange();
      document.execCommand("copy"); 
  
  } else if (window.getSelection) {
      var range = document.createRange();
       range.selectNode(code_panel);
       window.getSelection().addRange(range);
       document.execCommand("copy");
      
      }
}

var source = new EventSource("/services/build/execute?filename=" + filename);
source.close();

function execute_code(){
  var execute_btn = document.getElementById("execute_btn");
  execute_btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Running...';
  terminal_panel.innerHTML = "";
  terminal_container.style.display = "block";
  code_container.style.display = "none";
  source = new EventSource("/services/build/execute?filename=" + filename);
    source.onmessage = function(event) {
     //  source.close();
     console.log(event.data + " |||| " + event.data.includes("end_of_output"));
      if(event.data.includes("end_of_output")){
        source.close();
      } else {
        terminal_panel.innerHTML += event.data;
        execute_btn.innerHTML = 'Run';
      }
    }
}

function close_terminal() {
  source.close();
  terminal_container.style.display = "none";
  code_container.style.display = "block";
  execute_btn.innerHTML = 'Run';
}