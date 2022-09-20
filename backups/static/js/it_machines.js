document.addEventListener("DOMContentLoaded", function () {
    $("#table-reports").DataTable({
        searching: true,
        paging: false,
        info: true,
        autoWidth: false,
        lengthMenu: [
            [20, -1],
            [20, "All"],
        ],
        columnDefs: [],
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Polish.json",
        },
    });
    const cells = document.querySelectorAll("tr");
    const lang = document.getElementById("current-language").value;
    for (var i = 1; i < cells.length; i++) {
        cells[i].addEventListener("click", function (e) {
            row = e.path[1];
            var holistech_td = row.querySelectorAll("td");
            var holistech_value = holistech_td[2].innerText;
            console.log(holistech_value);
            location.href = "/" + lang + "/backups/machine/details/" + holistech_value;
        });
    }
});
