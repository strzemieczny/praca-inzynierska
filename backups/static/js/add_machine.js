document.addEventListener("DOMContentLoaded", function () {
    const confirmBtn = document.getElementById("submit-btn");
    confirmBtn.addEventListener("click", () => {
            const holistech = document.getElementById('id_machine_holistech').value;
            const ipaddr = document.getElementById('id_machine_ipaddr').value;
            const hostname = document.getElementById('id_machine_hostname').value;
            const fisname = document.getElementById('id_machine_fisname').value;
            const area = document.getElementById('id_machine_area').value;
            const owner = document.getElementById('id_machine_owner').value;
            console.log(owner);
            const form = document.getElementById("machine-form");
            const csrf = document.getElementsByName("csrfmiddlewaretoken");
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
                    // window.location.reload();
                    setTimeout(function () {
                        // window.location.reload();
                    }, 1000);
                },
                error: function (error) {
                    console.log("error");
                    console.log(error);
                },
                cache: false,
                contentType: false,
                processData: false,
            });
    });
});
