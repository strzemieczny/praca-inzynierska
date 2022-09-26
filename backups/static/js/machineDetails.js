document.addEventListener("DOMContentLoaded", function () {
    $("#table-reports").DataTable({
        destroy: true,
        autoWidth: false,
        searching: false,
        paging: false,
        info: false,
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
    $("#table-reports2").DataTable({
        destroy: true,
        autoWidth: false,
        searching: false,
        paging: false,
        info: false,
        autoWidth: false,
        lengthMenu: [
            [20, -1],
            [20, "All"],
        ],
        columnDefs: [
            {
                target: 0,
                visible: false,
            },
            {
                target: 1,
                width: "15%",
            },
            {
                target: 5,
                visible: false,
            },
            {
                target: 6,
                className: "smallColumnTxt",
            },
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Polish.json",
        },
    });
});
