document.addEventListener("DOMContentLoaded", function () {
    $("#table-reports").DataTable({
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
                target: 5,
                visible: false,
            },
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Polish.json",
        },
    });

    $("#table-reports2").DataTable({
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
                target: 5,
                visible: false,
            },
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Polish.json",
        },
    });

    $("#table-reports3").DataTable({
        searching: false,
        paging: false,
        info: false,
        autoWidth: false,
        columnDefs: [
            {
                target: 0,
                visible: false,
            },
            {
                target: 3,
                visible: false,
            },
            {
                target: 5,
                visible: false,
            },
            {
                target: 6,
                visible: false,
            },
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Polish.json",
        },
    });

    $("#table-reports-it").DataTable({
        searching: false,
        paging: false,
        info: false,
        autoWidth: false,
        columnDefs: [
            {
                target: 4,
                visible: false,
            },
            {
                target: 5,
                visible: false,
            },
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Polish.json",
        },
    });
    $("#table-reports-it2").DataTable({
        searching: false,
        paging: false,
        info: false,
        autoWidth: false,
        columnDefs: [
            {
                target: 2,
                width: "35%",
            },
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Polish.json",
        },
    });
});
