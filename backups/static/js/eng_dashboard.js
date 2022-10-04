document.addEventListener("DOMContentLoaded", function () {
    const btn1 = document.getElementById("eng-dash-btn1");
    const btn2 = document.getElementById("eng-dash-btn2");
    const btn3 = document.getElementById("eng-dash-btn3");
    const sectionMain = document.getElementById("content");
    const section1 = document.getElementById("eng-dash-sth1");
    const section2 = document.getElementById("eng-dash-sth2");
    const section3 = document.getElementById("eng-dash-sth3");
    const mainText = document.getElementById("eng-dash-mainp");

    btn1.addEventListener("click", () => {
        btn1.classList.add("dash-btn-clicked");
        btn2.classList.remove("dash-btn-clicked");
        btn3.classList.remove("dash-btn-clicked");
        sectionMain.classList.remove("grid");
        sectionMain.classList.add("section");
        mainText.classList.add("hidden");
        section2.classList.add("hidden");
        section3.classList.add("hidden");
        section1.classList.remove("hidden");
    });
    btn2.addEventListener("click", () => {
        btn2.classList.add("dash-btn-clicked");
        btn1.classList.remove("dash-btn-clicked");
        btn3.classList.remove("dash-btn-clicked");
        sectionMain.classList.remove("grid");
        sectionMain.classList.add("section");
        mainText.classList.add("hidden");
        section3.classList.add("hidden");
        section1.classList.add("hidden");
        section2.classList.remove("hidden");
    });
    btn3.addEventListener("click", () => {
        btn3.classList.add("dash-btn-clicked");
        btn1.classList.remove("dash-btn-clicked");
        btn2.classList.remove("dash-btn-clicked");
        sectionMain.classList.remove("grid");
        sectionMain.classList.add("section");
        mainText.classList.add("hidden");
        section1.classList.add("hidden");
        section2.classList.add("hidden");
        section3.classList.remove("hidden");
    });
});
