describe("When I calculate the sum of numbers within a String", function(){
	var calculator = new StringCalculator();
	
	function calculateTotal(thenMessage, stringNumbers, expectedTotal){
		var total = calculator.add(stringNumbers);
		it(thenMessage, function(){
			expect(total).toBe(expectedTotal);
		});
	}

	describe("And the String is blank", function(){
		calculateTotal("Then zero is returned", "", 0);
	});

	describe("And the String contains a single number", function(){
		calculateTotal("Then the parsed number is returned", "1", 1);
		calculateTotal("Then the parsed number is returned", "2", 2);
	});

	describe("And the String contains two numbers separated by a comma", function(){
		calculateTotal("Then the total of those two numbers is returned", "1,2", 3);
	});

	describe("And the String contains three numbers separated by comma and a new line", function(){
		calculateTotal("Then the total of those three numbers is returned", "1\n,2,3", 6);
	});

	describe("And the String contains a custom delimiter with two numbers", function(){
		calculateTotal("Then the total of those two numbers is returned", "//;\n1;2", 3);
	});

	describe("And the String contains one negative number", function(){
		it("Then an exception is thrown 'negatives not allowed'.", function(){
			try {
				var total = calculator.add("//;\n-1;2");
			} catch (err){
				expect(err.message).toBe("Negatives not allowed");
				expect(err.data[0]).toBe(-1);
			}
		});
	});

	describe("And the String contains two numbers, one being greater than 1000", function(){
		calculateTotal("Then the number greater than 1000 is ignored", "2,1001", 2);
	});

	describe("And the String contains multiple custom delimiters with four numbers", function(){
		calculateTotal("Then the total of those four numbers is returned", "//[***][;]\n1***2***3;4", 10);
	});
});