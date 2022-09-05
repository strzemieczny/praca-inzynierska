document.addEventListener("DOMContentLoaded", function () {
    const holistechBtn = document.getElementById('submit-btn-holistech');
    holistechBtn.addEventListener("click", ()=> {
        const form = document.getElementById("content-div");
        const csrf = document.getElementsByName("csrfmiddlewaretoken");
        let form_holistechField = document.getElementById('list-holistech');
        var form_holistechFieldDjango = document.getElementById('id_requestBackup_holistech');
        form_holistechFieldDjango.value = form_holistechField.value;
        var form_holistechFieldDjango = document.getElementById('id_requestBackup_holistech');
        console.log(form_holistechFieldDjango.value);
        let form_reasonField = document.getElementById('id_requestBackup_reason');
        const fd = new FormData();
        fd.append("csrfmiddlewaretoken", csrf[0].value);
        fd.append("requestBackup_holistech", form_holistechFieldDjango.value);
        fd.append("requestBackup_reason", form_reasonField.value);
        $.ajax({
            type: "POST",
            url: form.action,
            data: fd,
            success: function (response) {
                console.log("success");
                pathImg = document.getElementById('success-path').value;
                form.innerHTML = pathImg;
                setTimeout(function() {
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
    });
});