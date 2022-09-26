document.addEventListener("DOMContentLoaded", function () {
    const confirmBtn = document.getElementById("submit-btn");
    const tmp_jiraId = document.getElementById("id_restoredBackup_jiraId");
    const tmp_holistech = document.getElementById("id_restoredBackup_holistech");
    const tmp_hostname = document.getElementById("id_restoredBackup_hostname");
    const tmp_backup = document.getElementById("id_restoredBackup_backup");
    const tmp_reason = document.getElementById("id_restoredBackup_reason");

    const jira_regex = new RegExp("[I][T][-][0-9]{1,}");
    const def_regex = new RegExp("");

    // real time form verification
    tmp_jiraId.addEventListener("change", () => {
        verifyInput(tmp_jiraId, jira_regex);
    });
    tmp_holistech.addEventListener("change", () => {
        verifyInput(tmp_holistech, def_regex);
    });
    tmp_hostname.addEventListener("change", () => {
        verifyInput(tmp_hostname, def_regex);
    });
    tmp_backup.addEventListener("change", () => {
        verifyInput(tmp_backup, def_regex);
    });
    tmp_reason.addEventListener("change", () => {
        verifyInput(tmp_reason, def_regex);
    });
    // real time form verification

    confirmBtn.addEventListener("click", () => {
        if (
            tmp_jiraId.classList.contains("goodInput") &&
            tmp_holistech.classList.contains("goodInput") &&
            tmp_hostname.classList.contains("goodInput") &&
            tmp_backup.classList.contains("goodInput") &&
            tmp_reason.classList.contains("goodInput")
        ) {
            const csrf = document.getElementsByName("csrfmiddlewaretoken");
            const form = document.getElementById("machine-form");
            const successDiv = document.getElementById("success-div");

            const jiraId = document.getElementById("id_restoredBackup_jiraId").value;
            const holistech = document.getElementById("id_restoredBackup_holistech").value;
            const hostname = document.getElementById("id_restoredBackup_hostname").value;
            const backup = document.getElementById("id_restoredBackup_backup").value;
            const reason = document.getElementById("id_restoredBackup_reason").value;
            const creator = document.getElementById("user-id").value;

            let h1Box = document.getElementById("h1-box");

            const fd = new FormData();
            fd.append("csrfmiddlewaretoken", csrf[0].value);
            fd.append("restoredBackup_jiraId", jiraId);
            fd.append("restoredBackup_holistech", holistech);
            fd.append("restoredBackup_hostname", hostname);
            fd.append("restoredBackup_backup", backup);
            fd.append("restoredBackup_reason", reason);
            fd.append("restoredBackup_creator", creator);
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

function verifyInput(id, regex) {
    id.className = "";
    if (id.value == "" || !verifyRegex(id, regex)) {
        id.classList.add("badInput");
        id.classList.add("error");
        setTimeout(function () {
            id.classList.remove("error");
        }, 300);
        return false;
    } else {
        id.classList.add("goodInput");
        return true;
    }
}
function verifyRegex(id, regex) {
    if (regex.test(id.value)) {
        return true;
    } else {
        return false;
    }
}
