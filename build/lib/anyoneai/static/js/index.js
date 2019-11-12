
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
            list = list + `<div id="` + element[0] + `" class="c-card-file" ` + url_inj + `>` +   element[0]+ `</div>`;
            console.log(element);
        });
        $("#lab_list").html(list);

    });

}

function newProject() {
    window.open("../build?a=new");
}
var file_selected;
window.addEventListener("contextmenu", e => {
    if(e.target.classList[0] == "c-card-file") {
        console.log(e.target.id);
        file_selected = e.target.id;
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
        $.get('../service/build/duplicate', {file:file_selected}, function (data, textStatus, jqXHR) {
            if(data == "done") {
                get_files();
            }
        });
    } else if (e.target.innerHTML == "Rename") {
        $.get('../service/build/rename', {file:file_selected}, function (data, textStatus, jqXHR) {
            if(data == "done") {
                get_files();
            }
        });
    } else if (e.target.innerHTML == "Delete"){
        $.get('../service/build/delete', {file:file_selected}, function (data, textStatus, jqXHR) {
            if(data == "done") {
                get_files();            }
        });
    }
});