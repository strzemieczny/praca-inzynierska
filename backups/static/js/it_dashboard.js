document.addEventListener("DOMContentLoaded", function () {
    const btn1 = document.getElementById("it_dash_btn1");
    const btn2 = document.getElementById("it_dash_btn2");
    const section1 = document.getElementById("it-dash-backup-count");
    const section2 = document.getElementById("it-dash-newest-div");
    const section3 = document.getElementById("it-dash-oldest-div");
    const section4 = document.getElementById("it-dash-kpi-1");
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
        section4.classList.add("hidden");
        section1.classList.remove("hidden");
        $("#table-reports").DataTable({
            destroy: true,
            order: [[1, "desc"]],
            autoWidth: false,
            searching: true,
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
        section4.classList.add("hidden");
        section2.classList.remove("hidden");
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
    btn3.addEventListener("click", () => {
        btn3.classList.add("dash-btn-clicked");
        btn1.classList.remove("dash-btn-clicked");
        btn2.classList.remove("dash-btn-clicked");
        btn4.classList.remove("dash-btn-clicked");
        btn5.classList.remove("dash-btn-clicked");
        mainText.classList.add("hidden");
        section1.classList.add("hidden");
        section2.classList.add("hidden");
        section4.classList.add("hidden");
        section3.classList.remove("hidden");
        $("#table-reports3").DataTable({
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
        section4.classList.remove("hidden");
        const withIssues = document.getElementById("withIssues").value;
        const withIssuesJson = JSON.parse(withIssues);
        let json_keys = Object.keys(withIssuesJson);
        console.log(json_keys);
        for (var i = 0; i < json_keys.length; i++) {
            var idTmp = "div" + i;
            var id = document.getElementById(idTmp);
            console.log(id);
            drawSomething(json_keys[i], withIssuesJson[json_keys[i]]["True"], withIssuesJson[json_keys[i]]["False"], id);
        }
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
        section4.classList.add("hidden");
    });
});

function drawSomething(hostname, dataTrue, dataFalse, id) {
    console.log("GENERUJE AUUUUUUUUUUUUUUUUUUUU");
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn("string", "Good");
        data.addColumn("number", "Bad");
        data.addRows([
            ["Good", dataTrue],
            ["Bad", dataFalse],
        ]);
        var options = { title: hostname, backgroundColor: "transparent", colors: ["#46e356", "#ff3b3b"] };
        var chart = new google.visualization.PieChart(id);
        chart.draw(data, options);
    }
}
