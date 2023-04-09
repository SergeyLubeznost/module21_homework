// Задание 6.
// Написать код приложения, интерфейс которого состоит из двух input и кнопки.
// В input можно ввести любое число. Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит». Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:
// Если число в первом input не попадает в диапазон от 1 до 10 или
// не является числом — выводится ниже текст «Номер страницы вне диапазона от 1 до 10».
// Если число во втором input не попадает в диапазон от 1 до 10 или
// не является числом — выводится ниже текст «Лимит вне диапазона от 1 до 10».
// Если и первый, и второй input не в диапазонах или не являются
// числами — выводится ниже текст «Номер страницы и лимит вне диапазона от 1 до 10».
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по
// URL https://picsum.photos/v2/list?page=1&limit=10,
// где GET-параметр page — это число из первого input,
// а GET-параметр limit — это введённое число второго input.
// Пример: если пользователь ввёл 5 и 7, то запрос будет
// вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.
// Если пользователь перезагрузил страницу, то ему должны показываться
// картинки из последнего успешно выполненного запроса (использовать localStorage).

const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");

// объект DOM для вывода сообщений об ошибках в инпутах
const inputMessage = document.querySelector(".input-error");

// объект DOM для отображения в нём списка запрошенных изображений
const dataList = document.querySelector(".data-list");

// слушатель на кнопку запрос, проверяет корректность данных в инпутах
// при отрицательном результате отображает ошибку
// при положительном результате делает fetch запрос с заданными параметрами и
// запускает функцию отображения полученных данных
button1.addEventListener("click", () => {
    inputMessage.textContent = "";
    let input1Flag = false,
        input2Flag = false;
    input1.value && parseInt(input1.value) > 0 && parseInt(input1.value) < 11
        ? (input1Flag = true)
        : input1Flag;
    input2.value && parseInt(input2.value) > 0 && parseInt(input2.value) < 11
        ? (input2Flag = true)
        : input2Flag;

    if (input1Flag && input2Flag) {
        fetch(
            `https://picsum.photos/v2/list?page=${input1.value}&limit=${input2.value}`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // отображаем полученные данные, 2-й аргумент true т.к.
                // нужно сохранить данные в localStorage
                renderData(data, true);
            })
            .catch((error) => {
                alert(`ошибка: ${error}`);
            });
    } else if (!input1Flag && !input2Flag) {
        inputError("Номер страницы и лимит вне диапазона от 1 до 10");
    } else if (!input1Flag) {
        inputError("Номер страницы вне диапазона от 1 до 10");
    } else if (!input2Flag) {
        inputError("Лимит вне диапазона от 1 до 10");
    }
});
// ...

// слушатель на кнопку очистить localStorage
button2.addEventListener("click", () => {
    localStorage.clear();
});

// отвечает за отображения результата последнего запроса при перезагрузке
// страницы, срабатывает если в localStorage что то хранится
if (localStorage.length) {
    const storageArray = [];

    // формируем массив с сылками на изображения которые нужно отобразить
    // по типу полученного из запроса
    for (let i = 0; i < localStorage.length; i++) {
        storageArray.push({ download_url: localStorage[`pic${i}`] });
    }

    // передаём массив в функцию отрисовки, 2-й аргумент false т.к.
    // не нужно эти данные сохранять в localStorage повторно
    renderData(storageArray, false);
}

// функция отображения данных, 1-й аргумент массив с данными которые
// нужно отобразить, 2-й аргумент указывает нужно ли сохранять данные
// в localStorage (true или false)
function renderData(array, storage) {
    // если уже что то отображено то удаляем это
    let listItem = document.querySelectorAll(".data-list__item");
    if (listItem.length) {
        listItem.forEach((element) => {
            dataList.removeChild(element);
        });
    }
    // ...

    // если нужно сохранить данные то очищаем хранилище
    if (storage) localStorage.clear();

    // циклом отображаем данные
    for (let i = 0; i < array.length; i++) {
        dataList.insertAdjacentHTML(
            "beforeend",
            `<li class="data-list__item">
                <img src=${array[i].download_url} alt="pic">
            </li>`
        );

        // если нужно хранить данные, сохраняем их в хранилище localStorage
        if (storage) localStorage.setItem(`pic${i}`, array[i].download_url);
    }
    // ...
}
// ...

// выводит сообщение об ощибке
function inputError(message) {
    inputMessage.textContent = message;
}