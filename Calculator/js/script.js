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

	if (e.target.className.includes('eq')) {
		result = true;
		switch (operation) {
			case '+':
				return input.value = +firstValue + +secondValue;
			case '-':
				return input.value = +firstValue - +secondValue;
			case '*':
				return input.value = +firstValue * +secondValue;
			case '/':
				return input.value = +firstValue / +secondValue;
			case '^':
				return input.value = Math.pow(+firstValue, +secondValue)
		}

	}

	function addValue() {
		if (e.target.className.includes('delAll') || e.target.className.includes('del') || e.target.className.includes('eq')) {
			return;
		}

		if (e.target.className.includes('calculator__button_num')) {
			if (secondValue === '' && operation === '') {
				firstValue += value;
				input.value = firstValue;
			} else if (firstValue !== '' && operation !== '') {
				secondValue += value;
				input.value = `${firstValue} ${operation} ${secondValue}`;
			}
		} else if (e.target.className.includes('calculator__button_sys')) {
			if (firstValue !== '' && operation === '') {
				operation += value;
				input.value = `${firstValue} ${operation}`;
			} else if (operation !== '') {
				firstValue = input.value;
				operation = value;
				secondValue = '';
				result = false;
				input.value = `${firstValue} ${operation}`;
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

	if (operation === '') {
		firstValue = firstValue.split('').reverse().splice(1).reverse().join('');
		return input.value = firstValue;
	}

	let str = input.value;

	let arr = str.split('').reverse();
	arr = arr.splice(1).reverse().join('')

	input.value = arr;
}

input.onfocus = function () {
	return input.blur();
}

