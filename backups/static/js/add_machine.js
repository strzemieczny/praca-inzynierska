document.addEventListener("DOMContentLoaded", function () {
    const confirmBtn = document.getElementById("submit-btn");
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

    // real time form verification

    let tmp_holistech = document.getElementById('id_machine_holistech');
    let tmp_ipaddr = document.getElementById('id_machine_ipaddr');
    let tmp_hostname = document.getElementById('id_machine_hostname');
    let tmp_fisname = document.getElementById('id_machine_fisname');

    tmp_holistech.addEventListener("change", ()=> {
        tmp_holistech.className = '';
        if ( tmp_holistech.value == '' ) {
            tmp_holistech.classList.add('badInput');
        } else {
            tmp_holistech.classList.add('goodInput');
        }
    });

    tmp_ipaddr.addEventListener("change", ()=> {
        tmp_ipaddr.className = '';
        if ( tmp_ipaddr.value == '' ) {
            tmp_ipaddr.classList.add('badInput');
        } else if (regexExp.test(tmp_ipaddr.value)) {
            tmp_ipaddr.classList.add('goodInput');
        } else {
            tmp_ipaddr.classList.add('badInput');
        }
    });

    tmp_hostname.addEventListener("change", ()=> {
        tmp_hostname.className = '';
        if ( tmp_hostname.value == '' ) {
            tmp_hostname.classList.add('badInput');
        } else {
            tmp_hostname.classList.add('goodInput');
        }
    });

    tmp_fisname.addEventListener("change", ()=> {
        tmp_fisname.className = '';
        if ( tmp_fisname.value == '' ) {
            tmp_fisname.classList.add('badInput');
        } else {
            tmp_fisname.classList.add('goodInput');
        }
    });

    // real time form verification

    confirmBtn.addEventListener("click", () => {
        if (tmp_holistech.classList.contains('goodInput') && tmp_ipaddr.classList.contains('goodInput') && tmp_hostname.classList.contains('goodInput') && tmp_fisname.classList.contains('goodInput') ) {
            const csrf = document.getElementsByName("csrfmiddlewaretoken");
            const form = document.getElementById("machine-form");


            const holistech = document.getElementById('id_machine_holistech').value;
            const ipaddr = document.getElementById('id_machine_ipaddr').value;
            const hostname = document.getElementById('id_machine_hostname').value;
            const fisname = document.getElementById('id_machine_fisname').value;
            const area = document.getElementById('id_machine_area').value;
            const owner = document.getElementById('id_machine_owner').value;

            
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
                    console.log(error.responseJSON.message);
                    if (error.responseJSON.message == "HolistechExists") {
                        tmp_holistech.className = '';
                        tmp_holistech.classList.add('badInput');
                        tmp_holistech.value = "";
                        document.getElementById('h1-box').innerHTML = error.responseJSON.error;
                    }
                },
                cache: false,
                contentType: false,
                processData: false,
            });
        } else {
            alert('ty dzbanie');
        }
    });
});
