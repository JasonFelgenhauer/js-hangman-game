fetch('./assets/js/words.json')
	.then((res) => res.json())
	.then((data) => {
		const canvas = document.querySelector('canvas');
		const ctx = canvas.getContext('2d');
		const input = document.getElementById('word');
		const button_input = document.querySelectorAll('.input_button');
		const maxLife = 6;
		const lifeCount = document.getElementById('life_count');
		const incorrectInput = document.getElementById('incorrect');
		let win = false;
		let currentLife = 0;
		let incorrectLetter = [];

		const init = () => {
			ctx.strokeStyle = '#fbfbfb';
			ctx.lineWidth = 10;
			ctx.beginPath();
			ctx.moveTo(100, 350);
			ctx.lineTo(200, 350);
			ctx.moveTo(150, 350);
			ctx.lineTo(150, 100);
			ctx.moveTo(145, 100);
			ctx.lineTo(250, 100);
			ctx.moveTo(245, 100);
			ctx.lineTo(245, 150);
			ctx.stroke();

			input.value = convertWord(randomWord());

			console.log(word);
		};
		const randomWord = () => {
			let random = Math.floor(Math.random() * data.test.length);
			word = data.test[random];

			return word;
		};
		const convertWord = (word) => {
			let str = '';

			for (let i = 0; i < word.length; i++) {
				str += '_';
			}

			return str;
		};
		const loseLife = () => {
			ctx.beginPath();
			ctx.lineWidth = 5;
			if (currentLife <= maxLife) {
				switch (currentLife) {
					case 0:
						ctx.arc(245, 175, 25, 0, Math.PI * 2, true);
						ctx.stroke();
						currentLife++;
						break;
					case 1:
						ctx.moveTo(245, 200);
						ctx.lineTo(245, 300);
						ctx.stroke();
						currentLife++;
						break;
					case 2:
						ctx.moveTo(245, 220);
						ctx.lineTo(290, 200);
						ctx.stroke();
						currentLife++;
						break;
					case 3:
						ctx.moveTo(245, 220);
						ctx.lineTo(200, 200);
						ctx.stroke();
						currentLife++;
						break;
					case 4:
						ctx.moveTo(245, 300);
						ctx.lineTo(270, 325);
						ctx.stroke();
						currentLife++;
						break;
					case 5:
						ctx.moveTo(245, 300);
						ctx.lineTo(220, 325);
						ctx.stroke();
						currentLife++;
						break;
					default:
						break;
				}
				if (currentLife === maxLife) {
					input.value = 'You lose';
					button_input.forEach((b) => {
						b.setAttribute('disabled', 'true');
					});
				}
			}
		};

		init();

		button_input.forEach((b) => {
			b.addEventListener('click', () => {
				let letter = word.split('');
				let wordLetter = input.value.split('');
				let str = '';

				for (let i = 0; i < word.length; i++) {
					if (b.value === letter[i]) {
						wordLetter.splice(i, 1, b.value);
						win = true;
					}
					str += wordLetter[i];
				}
				if (win) {
					b.style.background = '#51e74a';
					input.value = str;
					b.setAttribute('disabled', 'true');
				} else {
					b.style.background = '#d43354';
					loseLife();
					lifeCount.innerText++;
					b.setAttribute('disabled', 'true');
					incorrectLetter.push(b.value);
					incorrectInput.innerText = 'Incorrect : ' + incorrectLetter.join(' - ');
				}
				win = false;
			});
		});
		document.body.addEventListener('keypress', (e) => {
			console.log(e.key);
			let letter = word.split('');
			let wordLetter = input.value.split('');
			let str = '';

			for (let i = 0; i < word.length; i++) {
				if (e.key === letter[i]) {
					wordLetter.splice(i, 1, e.key);
					win = true;
				}
				str += wordLetter[i];
			}
			if (win) {
				button_input.forEach((b) => {
					if (b.value === e.key) {
						b.style.background = '#51e74a';
						input.value = str;
						b.setAttribute('disabled', 'true');
					}
				});
			} else {
				button_input.forEach((b) => {
					if (b.value === e.key) {
						b.style.background = '#d43354';
						loseLife();
						lifeCount.innerText++;
						b.setAttribute('disabled', 'true');
						incorrectLetter.push(e.key);
						incorrectInput.innerText = 'Incorrect : ' + incorrectLetter.join(' - ');
					}
				});
			}
			win = false;
		});
	});
