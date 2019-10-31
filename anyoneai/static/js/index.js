var code_panel = document.getElementById('code_panel');

$( document ).ready(function() {
    $.getJSON('../service/labs', function(data) {
        $("#levels").html("");

        data.forEach(function (element, index) {
            var active = "";
            if(index==0) active="active";
            $("#levels").append('<a id="' + element.name.replace(/ /g, "_") + '" class="list-group-item level ' + active +'">' + element.name + '</a>');
            console.log('<a href="#!" class="list-group-item ' + active +'">' + element.name + '</a>');
        });
        getlevel(data[0].name);
    console.log(data);
});
})

var lab_session_url_v;

function lab_session_url() {
    return lab_session_url_v;
}

function getlevel (level) {
    $("#lab_list").html("");
    $("#lab_list").append(`<div class="text-center">
                            <div class="spinner-grow text-primary" role="status" style="margin-top: 30px">
                            <span class="sr-only">Loading...</span>
                            </div>
                            </div>`);
    $.getJSON('../service/labs/'+ level.replace(/_/g, " "), function(data) {
        $("#lab_list").html("");

        data.forEach(function (element) {
            $("#lab_list").append(` <div class="c-card" onclick="document.getElementById('model_text').innerHTML = '`+ element.description + `'; $('#startLabModal').modal('show'); lab_session_url_v = './lab/` + element.name + `'"; >
                                    <h5>` + element.name +`</h6>
                                    <p class="light">Duration: ` + element.duration +`</p>
                                    <p>` + element.description +`</p>
                                    </div>`
                                    );
            console.log(element);
        });
    });

}


$('#levels').on('click', function (event) {
    if (event.target != this) {
        $("#levels a").parent().find('a').removeClass("active");
        jQuery('#' + event.target.id).addClass('active');
        getlevel(event.target.id);
    } 
  });

  function refreshCodeDisp() {
    var code = Blockly.Python.workspaceToCode(mainWorkspace);
    code_panel.innerHTML = code.replace(/\n/g, "<br />");
  }
  