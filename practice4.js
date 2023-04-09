
let number =  Math.ceil(Math.random() * 100);

{
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        
	if (number % 2 == 0) {
		resolve(`Завершено успешно. Сгенерированное число ${ number}`);
	} else {
		reject(`Завершено с ошибкой. Сгенерированное число ${ number}`);
	}
}, 3000);  
});

promise

	.then((result) => {
		console.log('Обработка результата resolve: ', result);
	})
	.catch((error) => {
		console.log('Обработка результата reject: ', error);
	});
}

   