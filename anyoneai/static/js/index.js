
$( document ).ready(function() {
    $.getJSON('../service/build/cwd', function(data) {
        $("#pwd-txt").html(data);
    });
    get_files();
});


var lab_session_url_v;

function lab_session_url() {
    return lab_session_url_v;
}

function get_files() {
    $("#lab_list").html("");
    $("#lab_list").append(`<div class="text-center">
                            <div class="spinner-grow text-primary" role="status" style="margin-top: 30px">
                            <span class="sr-only">Loading...</span>
                            </div>
                            </div>`);
    $.getJSON('../service/build/files', function(data) {
        $("#lab_list").html("");
        list = ""
        data.forEach(function (element) {
            if (element[1] != "") {
                url_inj = `onclick='window.open("`+ element[1] + `", "_blank")'`;
            } else {
                url_inj = `onclick='alert("This file is not an AnyoneAI Project")'`;
            }
            list = list + `<div id="` + element[0] + `" class="c-card-file" ` + url_inj + `><p style="margin: 0px;">` +   element[0]+ `</p></div>`;
            console.log(element);
        });
        $("#lab_list").html(list);

    });

}

function newProject() {
    $('#startLabModal').modal('show')
    document.getElementById("file_Exists_indicator").style.display = "none";
    document.getElementById("prj_filename").value = "Untitled Project";

  //  window.open("../build?a=new");
}

function createProject(){
    var filename = document.getElementById("prj_filename");
    $.get('../service/build/create', {filename:filename.value}, function(data) {
        if(data == "file exists") {
            document.getElementById("file_Exists_indicator").style.display = "block";
        } else {
            $('#startLabModal').modal('hide')
            get_files();
            window.open("../build?filename=" + data);
        }
    }
    );

}

function rename_file(){
    var new_filename = document.getElementById("rename_filename");
    $.get('../service/build/rename', {filename:file_selected, new_filename:new_filename.value}, function (data, textStatus, jqXHR) {
        if(data == "done") {
            get_files();
            $('#renameModal').modal('hide');
        } else {
            document.getElementById("rename_error").style.display = "block";
        }
    });
}


var file_selected;
window.addEventListener("contextmenu", e => {
    if(e.target.classList[0] == "c-card-file" || e.target.parentElement.classList[0] == "c-card-file") {
        if (e.target.classList[0] == "c-card-file")
        file_selected = e.target.id;
        else
        file_selected = e.target.parentElement.id;
        e.preventDefault();
        const origin = {
            left: e.pageX,
            top: e.pageY
          };
          setPosition(origin);
          return false;
    }
    else {
        if (menuVisible) toggleMenu("hide");
    }
  
  });


const menu = document.querySelector(".menu");
const menuOption = document.querySelector(".menu-option");
let menuVisible = false;

const toggleMenu = command => {
  menu.style.display = command === "show" ? "block" : "none";
  menu.style.marginTop = "-10px";
  menu.style.opacity = "0";
  $(".menu").animate({opacity: '1', marginTop: "0px"});
  menuVisible = !menuVisible;
};

const setPosition = ({ top, left }) => {
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  toggleMenu("show");
};

window.addEventListener("onfocusout", e => {
  if (menuVisible) toggleMenu("hide");
});

window.addEventListener("click", e => {
    if (menuVisible) toggleMenu("hide");

    if(e.target.innerHTML == "Open") {
    document.getElementById(file_selected).click();
    } else if (e.target.innerHTML == "Duplicate") {
        $.get('../service/build/duplicate', {filename:file_selected}, function (data, textStatus, jqXHR) {
            if(data == "done") {
                get_files();
            }
        });
    } else if (e.target.innerHTML == "Rename") {
        document.getElementById("rename_error").style.display = "none";
        document.getElementById("rename_filename").value = file_selected;
        $('#renameModal').modal('show');
        
    } else if (e.target.innerHTML == "Delete"){
        $.get('../service/build/delete', {filename:file_selected}, function (data, textStatus, jqXHR) {
            if(data == "done") {
                get_files();            }
        });
    }
});