$(document).ready(function () {
    $('#feedback').submit(function (e) {
        e.preventDefault();
        let msg = document.querySelector('#form-messages');
        let errEmail = document.querySelector('#errEmail');
        let errPhone = document.querySelector('#errPhone');
        let name = $("#name").val();
        let phone = $("#phone").val();
        let email = $("#email").val();
        let message = $("#message").val();

        if (ValidPhone(phone, errPhone) & ValidEmail(email, errEmail)) {
            $.ajax({
                url: 'mail.php',
                type: "POST",
                dataType: "json",
                crossDomain: true, 
                data: { name, phone, email, message}, 
                success: function (response) {
                    msg.textContent = 'Сообщение отправлено';
                },
                error: function (response) { 
                    msg.textContent = 'Ошибка отправления';
                }
            })
        }
    });
    function ValidEmail(email, msg) {
        let r = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        let valid = r.test(email);
        if (valid) m = "";
        else m = "E-Mail введен не корректно";
        msg.textContent = m;
        return valid;
    }
    function ValidPhone(phone, msg) {
        let r = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
        let valid = r.test(phone);
        if (valid) m = "";
        else m = "Номер телефона введен не корректно";
        msg.textContent = m;
        return valid;
    }
});