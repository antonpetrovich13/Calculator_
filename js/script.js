const input = document.querySelector('.calculator__input');
const deleteAll = document.querySelector('.delAll');
const deleteLastValue = document.querySelector('.del');
let firstValue = '';
let secondValue = '';
let operation = '';
let result = false;


document.addEventListener('click', function (e) {

	if (!e.target.className.includes('calculator__button')) {
		return;
	}

	let value = e.target.innerHTML;

	// Расчёт результата по шаблону при нажатии на кнопку "РАВНО"
	if (e.target.className.includes('eq')) {
		result = true;
		let x = +firstValue;
		let y = +secondValue;
		let op = operation;

		//ОБНУЛЕНИЕ
		operation = '';
		secondValue = '';
		result = false;

		//ПОЛУЧЕНИЕ РЕЗУЛЬТАТА
		switch (op) {
			case '+':
				return firstValue = input.value = x + y;
			case '-':
				return firstValue = input.value = x - y;
			case '*':
				return firstValue = input.value = x * y;
			case '/':
				return firstValue = input.value = x / y;
			case '^':
				return firstValue = input.value = Math.pow(x, y)
		}
	}

	// ДОБАВЛЕНИЕ ЗНАЧЕНИЙ В ПОЛЕ
	function addValue() {
		if (e.target.className.includes('delAll') || e.target.className.includes('del') || e.target.className.includes('eq')) {
			return;
		}

		if (e.target.className.includes('calculator__button_num')) {

			// ЗАПОЛНЕНИЕ ЗНАЧЕНИЯ ДЛЯ ПЕРВОГО ЧИСЛА
			if (secondValue === '' && operation === '') {
				firstValue += value;

				// УСТРАНЕННИЕ ЗНАЧЕНИЙ ТИПА "02"
				if (firstValue.startsWith(0) && !firstValue.includes('.')) {
					firstValue = firstValue.split('').splice(1).join('')
				}
				input.value = firstValue;
				// ЗАПОЛНЕНИЕ ЗНАЧЕНИЯ ДЛЯ ВТОРОГО ЧИСЛА
			} else if (firstValue !== '' && operation !== '') {
				secondValue += value;
				input.value = `${firstValue} ${operation} ${secondValue}`;
			}

			// ДЕЙСТВИЯ ПРИ НАЖАТИИ НА СИСТЕМНЫЕ КНОПКИ
		} else if (e.target.className.includes('calculator__button_sys')) {

			// ЗАПОЛНЕНИЕ ПЕРЕМЕННОЙ OPERATION
			if (firstValue !== '' && operation === '') {
				operation += value;
				input.value = `${firstValue} ${operation}`;
			} // НЕ ДАЕМ ВВЕСТИ 2 МАТЕМАТИЧЕСКИХ ЗНАКА ПОДРЯД
			else if (firstValue !== '' && operation !== '' && secondValue === '') {
				return;
			} // ОСТАНАВЛИВАЕМ ВВОД, ЕСЛИ ЗАПОЛНЕНЫ ВСЕ ПЕРЕМЕННЫЕ, НО РЕЗУЛЬТАТ ВЫЧИСЛЕН НЕ БЫЛ
			else if (firstValue !== '' && operation !== '' && secondValue !== '' && result === false) {
				return
			}
		}
	}
	addValue();
})


deleteAll.onclick = function () {
	firstValue = '';
	operation = '';
	secondValue = '';
	input.value = 0;
}

deleteLastValue.onclick = function () {

	// ЕСЛИ ПЕРВОЕ ЧИСЛО ПРЕДСТАВЛЯЕТ СОБОЙ ЦИФРУ, ТО ПРИ ЕГО УДАЛЕНИИ ВЕРНУТЬ 0
	if ((firstValue > 0 && firstValue < 10) && operation === '') {
		firstValue = '';
		return input.value = 0;
	}

	// ИСПРАВЛЕНИЕ ПЕРВОГО ЧИСЛА
	if (operation === '') {
		// firstValue = firstValue.toString();
		firstValue = firstValue.toString().split('').reverse().splice(1).reverse().join('');
		return input.value = firstValue;
	} // ИСПРАВЛЕНИЕ МАТЕМАТИЧЕСКОГО ЗНАКА
	else if (operation !== '' && secondValue === '') {
		operation = '';
	} else if (operation !== '' && secondValue !== '') {
		secondValue = secondValue.split('').reverse().splice(1).reverse().join('');
	}

	let str = input.value;

	let arr = str.split('').reverse();
	arr = arr.splice(1).reverse().join('')

	input.value = arr;
}

input.onfocus = function () {
	return input.blur();
}

