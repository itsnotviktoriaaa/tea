$(document).ready(function() {

    new WOW({
        animateClass: 'animate__animated'
    }).init();

    $('.product-image').magnificPopup({
        type: 'image'
    });

    $('.single-item').slick();
    $(function () {
        let icons = {
            header: "iconClosed",
            activeHeader: "iconOpen"
        };
        $( "#accordion" ).accordion( {
            icons: icons
        });
    });

    let firstName = $('#inputFirstName');
    let lastName = $('#inputLastName');
    let inputTel = $('#inputTel');
    let inputCountry = $('#inputCountry');
    let inputIndex = $('#inputIndex');
    let inputAddress = $('#inputAddress');

    let buttonSubmit = $('#buttonSubmit');

    inputIndex.on('keydown', function (event) {
        let getInputValue = parseInt(event.key);
        if (isNaN(getInputValue)) {
            alert('В поле "Индекс" можно вводить только цифры')
            return false;
        }
        if (inputIndex.val().length >= 6) {
            alert('В поле "Индекс" можно вводить не больше 6 значений')
            return false;
        }
    });

    buttonSubmit.on('click', function() {
        if (!firstName.val()) {
            alert('Введите Ваше имя');
            return false;
        }
        if (!lastName.val()) {
            alert('Введите Вашу фамилию');
            return false;
        }
        if (!inputTel.val()) {
            alert('Введите Ваш телефон');
            return false;
        }
        if (!inputCountry.val()) {
            alert('Введите Вашу страну');
            return false;
        }
        if (!inputIndex.val()) {
            alert('Введите Ваш почтовый индекс');
            return false;
        }
        if (!inputAddress.val()) {
            alert('Введите адрес доставки');
            return false;
        } else {
            $('#formActive').css('display', 'none');
            $('#forSubmit').append("<p>Спасибо за заказ. Мы свяжемся с вами в ближайшее время!</p>");
        }
    });





















});



