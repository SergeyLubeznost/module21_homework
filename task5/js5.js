/*Написать код приложения, интерфейс которого состоит из поля ввода и кнопки «Получить список задач». При нажатии на кнопку нужно отправить запрос с помощью fetch на URL https://jsonplaceholder.typicode.com/users/3/todos. Число 3 представляет собой id пользователя, вместо него нужно подставить число, введенное в поле. Если пользователь с таким id существует, вернется список задач для этого пользователя, каждая задача представлена объектом вида:

{
    "userId": 3,
    "id": 43,
    "title": "tempore ut sint quis recusandae",
    "completed": true
}
Где title — описание задачи, а completed — флаг, отображающий, выполнена задача или нет. Вывести данный список на страницу, оформив соответствующим образом: в виде списка (ul или ol), выполненные задачи должны быть написаны зачеркнутым текстом. Если пользователь с введенным id не существует, вывести сообщение: «Пользователь с указанным id не найден».

Удачи!
*/



const input = document.querySelector("#input");
const button = document.querySelector("#button");
const dataList = document.querySelector(".data-list"); 

button.addEventListener("click", () => {
    if (input.value && parseInt(input.value) >= 0) {
        fetch(`https://jsonplaceholder.typicode.com/users/${input.value}/todos`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.length === 0) {
                    alert("Пользователь с указанным id не найден");
                } else {
                    renderData(data);
                }
            })
            .catch((error) => {
                alert(`ошибка: ${error}`);
            });
    } else alert("Введите id");
});

function renderData(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].completed) {
            dataList.insertAdjacentHTML(
                "beforeend",
                `<li>
                    <div><s>UserID:${array[i].userId}</s></div>
                    <div><s>Task ID: ${array[i].id}</s></div>
                    <div><s>Title:${array[i].title}</s></div>
                    <div><s>Completed: ${array[i].completed}</s></div>
                </li>`
            );
        } else {
            let taskStatus = "todo";
            dataList.insertAdjacentHTML(
                "beforeend",
                `<li >
                    <div>UserID:${array[i].userId}</div>
                    <div>Task ID: ${array[i].id}</div>
                    <div>Title:<span ${array[i].title}</div>
                    <div>Completed: ${array[i].completed}</div>
                </li>`
            );
        }
    }
}
