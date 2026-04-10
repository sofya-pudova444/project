
async function fetchData(d) {
    let url = `http://localhost/myserver/post` // адрес куда отправляется запрос
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(d).toString()
    });
    
}

//Функция для формы заявки.POST
function reg_form() {
    const btn_reg = document.querySelector('#btn_reg'); //достаем id кнопки
    
    btn_reg.addEventListener('click', event => {
        // Получаем значения из полей ввода
        const email = document.querySelector('#email').value.trim();
        const passw = document.querySelector('#passw').value;
        const passw_pow = document.querySelector('#passw_pow').value;
        
        // Шаблоны для проверки
        const shablon_email = /^\S+@\S+\.\S+$/;
        const shablon_passw = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // Пароль от 8 символов, минимум 1 цифра и 1 заглавная буква

        // Проверка на пустые поля
        if (!email || !passw || !passw_pow) {
            alert('Все поля должны быть заполнены');
            return;
        }
        
        // Проверка паролей на совпадение и соответствие шаблону
        if (passw !== passw_pow) {
            alert('Пароли не совпадают');
            return;
        }
        
        if (!shablon_passw.test(passw)) {
            alert('Пароль слишком простой. Требуется минимум 8 символов, одна цифра и одна заглавная буква.');
            return;
        }
        
        if (!shablon_email.test(email)) {
            alert('Некорректный адрес электронной почты');
            return;
        }
        
        // Если все проверки пройдены, то отправляем данные
        alert('Успешно');
        const d = { email, passw, passw_pow };
        
        fetchData(d); // Передаем объект в функцию
        
        event.preventDefault(); // Предотвращаем перезагрузку страницы
    });
}

document.addEventListener('DOMContentLoaded', function () {
    reg_form();
});

// Функция для вывода каталога на страницу
async function see_catalog() {
    const catalog_menu = document.querySelector('.catalog_menu');

    let url = `http://localhost/myserver/get`;
    
    let response = await fetch(url);  // Выполняем GET-запрос к серверу
    let data = await response.json();  // Преобразуем ответ сервера из JSON-формата в JavaScript-объект

     // Перебираем каждый элемент массива data
    for (let item of data) {
    const newLi = document.createElement('li'); // Создание li для вывода каталога
    newLi.textContent = item.name_catalog // добавление элементов
    catalog_menu.appendChild(newLi); // Добавляем созданный <li> внутрь <ul>
}
}

// Вызов при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    see_catalog();
});