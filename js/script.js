// Функция отправки данных на сервер
// Принимаем объект с данными напрямую
async function fetchData(email,passw,passw_pow) {
    let url = `http://localhost/myserver/?email=${email}&passw=${passw}&passw_pow=${passw_pow}`
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(email, passw, passw_pow).toString()
    });
    
    // Проверка ответа от сервера (опционально)
    if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Ответ сервера:', result);
}


function reg_form() {
    const btn_reg = document.querySelector('#btn_reg');
    
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
        
        // Если все проверки пройдены, создаем объект с данными и отправляем
        alert('Успешно');
        const d = { email, passw, passw_pow };
        
        fetchData(d); // Передаем объект в функцию
        
        event.preventDefault(); // Предотвращаем перезагрузку страницы
    });
}

document.addEventListener('DOMContentLoaded', function () {
    reg_form();
});