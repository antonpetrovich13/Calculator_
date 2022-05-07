const input = document.querySelector('.calculator__input');
const result = document.querySelector('.eq');
const deleteAll = document.querySelector('.delAll');
const deleteLastValue = document.querySelector('.del');


document.addEventListener('click', function (e) {

	if (!e.target.className.includes('calculator__button')) {
		return;
	}

	let value = e.target.innerHTML;

	function addValue() {
		if (e.target.className.includes('delAll') || e.target.className.includes('del')) {
			return;
		}
		input.value += value;
	}

	addValue();

})

deleteAll.onclick = function () {
	input.value = '';
}

deleteLastValue.onclick = function () {

	let str = input.value;

	let arr = str.split('').reverse();
	arr = arr.splice(1).reverse().join('')

	input.value = arr;
}

input.onfocus = function () {
	return input.blur();
}