function StringCalculator() {
}

StringCalculator.prototype.hasCustomDelimiters = function(numbers){
	return numbers.indexOf("//") === 0;
};

StringCalculator.prototype.getCustomDelimiters = function(delimiterText){
	var delimiters = delimiterText.split(/[[\]]/);

	for (index = delimiters.length - 1; index >= 0; index--){
		if (delimiters[index].length > 1){
			delimiters[index] = "[\\" + delimiters[index] + "]";
		}
	}
	return new RegExp(delimiters.join('|'));
};

StringCalculator.prototype.add = function(numbers){
	var delimiters = /\n|,/, total = 0, negativeNumbersFound = [];

	if (this.hasCustomDelimiters(numbers)) {
		var indexOfNewLine = numbers.indexOf('\n');
		var delimiterText = numbers.substr(2, indexOfNewLine - 2);
		delimiters = this.getCustomDelimiters(delimiterText);
		numbers = numbers.substr(indexOfNewLine);
	}

	var numbersAsArray = numbers.split(delimiters);

	for (var index = 0; index < numbersAsArray.length; index++){
		var currentValue = parseInt(numbersAsArray[index], 10);
		if (isNaN(currentValue) || currentValue > 1000){
			continue;
		}
		if (currentValue < 0){
			negativeNumbersFound.push(currentValue);
		}
		total += currentValue;
	}

	if (negativeNumbersFound.length > 0){
		throw { message: "Negatives not allowed", data: negativeNumbersFound };
	}

	return total;
};