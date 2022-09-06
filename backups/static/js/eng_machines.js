document.addEventListener("DOMContentLoaded", function() {
    $('#table-reports5').DataTable( {
        searching: true,
        paging: true,
        "info" : true,
        "autoWidth": true,
        "lengthMenu": [ [15, 50, 100, -1] , [15, 50, 100, "All"]],
        columnDefs: [
            {
                target: 4,
                width: "10%",
            },
            {
                target: 5,
                visible: false,
            }
        ],
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Polish.json"
        },
    });
});