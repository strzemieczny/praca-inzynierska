document.addEventListener("DOMContentLoaded", function () {
    const confirmBtn = document.getElementById("submit-btn");
    const tmp_jiraId = document.getElementById("id_restoredBackup_jiraId");
    const tmp_holistech = document.getElementById("id_restoredBackup_holistech");
    const tmp_hostname = document.getElementById("id_restoredBackup_hostname");
    const tmp_backup = document.getElementById("id_restoredBackup_backup");
    const tmp_reason = document.getElementById("id_restoredBackup_reason");
    // real time form verification
    tmp_jiraId.addEventListener("change", () => {
        tmp_jiraId.className = "";
        if (tmp_jiraId.value == "") {
            tmp_jiraId.classList.add("badInput");
            tmp_jiraId.classList.add("error");
            setTimeout(function () {
                tmp_jiraId.classList.remove("error");
            }, 300);
        } else {
            tmp_jiraId.classList.add("goodInput");
        }
    });
    tmp_holistech.addEventListener("change", () => {
        tmp_holistech.className = "";
        if (tmp_holistech.value == "") {
            tmp_holistech.classList.add("badInput");
            tmp_holistech.classList.add("error");
            setTimeout(function () {
                tmp_holistech.classList.remove("error");
            }, 300);
        } else {
            tmp_holistech.classList.add("goodInput");
        }
    });
    tmp_hostname.addEventListener("change", () => {
        tmp_hostname.className = "";
        if (tmp_hostname.value == "") {
            tmp_hostname.classList.add("badInput");
            tmp_hostname.classList.add("error");
            setTimeout(function () {
                tmp_hostname.classList.remove("error");
            }, 300);
        } else {
            tmp_hostname.classList.add("goodInput");
        }
    });
    tmp_backup.addEventListener("change", () => {
        tmp_backup.className = "";
        if (tmp_backup.value == "") {
            tmp_backup.classList.add("badInput");
            tmp_backup.classList.add("error");
            setTimeout(function () {
                tmp_backup.classList.remove("error");
            }, 300);
        } else {
            tmp_backup.classList.add("goodInput");
        }
    });
    tmp_reason.addEventListener("change", () => {
        tmp_reason.className = "";
        if (tmp_reason.value == "") {
            tmp_reason.classList.add("badInput");
            tmp_reason.classList.add("error");
            setTimeout(function () {
                tmp_reason.classList.remove("error");
            }, 300);
        } else {
            tmp_reason.classList.add("goodInput");
        }
    });
    // real time form verification

    confirmBtn.addEventListener("click", () => {
        if (
            tmp_holistech.classList.contains("goodInput") &&
            tmp_ipaddr.classList.contains("goodInput") &&
            tmp_hostname.classList.contains("goodInput") &&
            tmp_fisname.classList.contains("goodInput")
        ) {
            const csrf = document.getElementsByName("csrfmiddlewaretoken");
            const form = document.getElementById("machine-form");
            const successDiv = document.getElementById("success-div");

            const holistech = document.getElementById("id_machine_holistech").value;
            const ipaddr = document.getElementById("id_machine_ipaddr").value;
            const hostname = document.getElementById("id_machine_hostname").value;
            const fisname = document.getElementById("id_machine_fisname").value;
            const area = document.getElementById("id_machine_area").value;
            const owner = document.getElementById("user-id").value;

            let h1Box = document.getElementById("h1-box");

            const fd = new FormData();
            fd.append("csrfmiddlewaretoken", csrf[0].value);
            fd.append("machine_holistech", holistech);
            fd.append("machine_ipaddr", ipaddr);
            fd.append("machine_hostname", hostname);
            fd.append("machine_fisname", fisname);
            fd.append("machine_area", area);
            fd.append("owner", owner);
            $.ajax({
                type: "POST",
                url: form.action,
                data: fd,
                success: function (response) {
                    console.log("success");
                    form.classList.add("hidden");
                    h1Box.classList.add("hidden");
                    successDiv.classList.remove("hidden");
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                },
                error: function (error) {
                    console.log("error");
                    console.log(error.responseJSON.message);
                    if (error.responseJSON.message == "HolistechExists") {
                        tmp_holistech.className = "";
                        tmp_holistech.classList.add("badInput");
                        tmp_holistech.classList.add("error");
                        setTimeout(function () {
                            tmp_holistech.classList.remove("error");
                        }, 300);
                        tmp_holistech.value = "";
                        let h1Box = document.getElementById("h1-box");
                        h1Box.innerHTML = error.responseJSON.error;
                        h1Box.classList.add("color-red");
                    }
                },
                cache: false,
                contentType: false,
                processData: false,
            });
        } else {
            alert("ty dzbanie");
        }
    });
});
