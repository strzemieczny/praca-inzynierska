document.addEventListener("DOMContentLoaded", function () {
    const btn1 = document.getElementById("it_dash_btn1");
    const btn2 = document.getElementById("it_dash_btn2");
    const section1 = document.getElementById("it-dash-backup-count");
    const section2 = document.getElementById("it-dash-newest-div");
    const section3 = document.getElementById("it-dash-oldest-div");
    const btn3 = document.getElementById("it_dash_btn3");
    const btn4 = document.getElementById("it_dash_btn4");
    const btn5 = document.getElementById("it_dash_btn5");
    const mainText = document.getElementById("it-dash-mainp");

    btn1.addEventListener("click", () => {
        btn1.classList.add("dash-btn-clicked");
        btn2.classList.remove("dash-btn-clicked");
        btn3.classList.remove("dash-btn-clicked");
        btn4.classList.remove("dash-btn-clicked");
        btn5.classList.remove("dash-btn-clicked");
        mainText.classList.add("hidden");
        section2.classList.add("hidden");
        section3.classList.add("hidden");
    });
    btn2.addEventListener("click", () => {
        btn2.classList.add("dash-btn-clicked");
        btn1.classList.remove("dash-btn-clicked");
        btn3.classList.remove("dash-btn-clicked");
        btn4.classList.remove("dash-btn-clicked");
        btn5.classList.remove("dash-btn-clicked");
        mainText.classList.add("hidden");
        section3.classList.add("hidden");
        section1.classList.add("hidden");
        section2.classList.remove("hidden");
        $("#table-reports").DataTable({
            destroy: true,
            autoWidth: false,
            searching: true,
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
    btn3.addEventListener("click", () => {
        btn3.classList.add("dash-btn-clicked");
        btn1.classList.remove("dash-btn-clicked");
        btn2.classList.remove("dash-btn-clicked");
        btn4.classList.remove("dash-btn-clicked");
        btn5.classList.remove("dash-btn-clicked");
        mainText.classList.add("hidden");
        section2.classList.add("hidden");
        section3.classList.remove("hidden");
        $("#table-reports2").DataTable({
            destroy: true,
            autoWidth: false,
            searching: true,
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
    btn4.addEventListener("click", () => {
        btn4.classList.add("dash-btn-clicked");
        btn1.classList.remove("dash-btn-clicked");
        btn2.classList.remove("dash-btn-clicked");
        btn3.classList.remove("dash-btn-clicked");
        btn5.classList.remove("dash-btn-clicked");
        mainText.classList.add("hidden");
        section1.classList.add("hidden");
        section2.classList.add("hidden");
        section3.classList.add("hidden");
    });
    btn5.addEventListener("click", () => {
        btn5.classList.add("dash-btn-clicked");
        btn1.classList.remove("dash-btn-clicked");
        btn2.classList.remove("dash-btn-clicked");
        btn3.classList.remove("dash-btn-clicked");
        btn4.classList.remove("dash-btn-clicked");
        mainText.classList.add("hidden");
        section1.classList.add("hidden");
        section2.classList.add("hidden");
        section3.classList.add("hidden");
    });
});
