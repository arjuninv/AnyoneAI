
$( document ).ready(function() {
    $.getJSON('../service/build/cwd', function(data) {
        $("#pwd-txt").html(">> " + data);
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
                url_inj = `onclick="window.open("`+ element[1] + `", "_blank")>`;
            } else {
                url_inj = `onclick='alert("This file is not an AnyoneAI Project")'`;
            }
            list = list + `<div class="c-card-file"` + url_inj + ` <h5>` + element[0] +`</h6> </div>`;
            console.log(element);
        });
        $("#lab_list").html(list);

    });

}
