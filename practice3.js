let userName = localStorage.getItem("userName");
let days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Субота"]
let months = ['Декабря','Января' , 'Февраля' , 'Марта' , 'Апреля' , 'Мая' , 'Июня' , 'Июля' , 'Августа' , 'Сентября' , 'Октября' , 'Ноября'  ];
let date = new Date();
let day = String(date.getDate());
let month =String( date.getMonth()+1);
let year = String(date.getFullYear());
let hours = String(date.getHours());
let minutes =String( date.getMinutes());

console.log(days[day], months[month])
let options = { weekday: 'long'};
let daysRu=new Intl.DateTimeFormat('ru-RU', options).format(date);
console.log(daysRu)
if (userName) {
    alert(
        "Добрый день, " +
            localStorage.getItem("userName") +
            "! Давно не виделись. В последний раз вы были у нас " +
            localStorage.getItem("lastDate")
    );
}
// если нет, то просим ввести своё имя
else {
    userName = prompt("Добро пожаловать! Назовите, пожалуйста, ваше имя");
    console.log(userName);
    if (userName) {
        localStorage.setItem("userName", userName);
        lastDate = `${daysRu}-${day}-${months[month]}-${year} ${hours}:${minutes}`;
        localStorage.setItem("lastDate", lastDate);
        console.log(lastDate)
        
    }
}

//localStorage.clear();
