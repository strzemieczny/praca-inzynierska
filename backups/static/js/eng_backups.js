document.addEventListener("DOMContentLoaded", function() {
    $('#table-reports4').DataTable( {
        searching: true,
        paging: true,
        "info" : true,
        "autoWidth": true,
        "lengthMenu": [ [15, 50, 100, -1] , [15, 50, 100, "All"]],
        columnDefs: [
            {
                target: 0,
                visible: false,
            },
            {
                target: 1,
                width: "10%",
            },
            {
                target: 2,
                width: "10%",
            },
            {
                target: 3,
                width: "5%",
            },
            {
                target: 4,
                width: "13%",
            },
            {
                target: 5,
                visible: false,
            },
            {
                target: 6,
                // width: "40%",
            }
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Polish.json"
        },
    });
});