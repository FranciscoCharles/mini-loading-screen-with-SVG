(function () {

	const containerCircle = document.querySelector('.container-circle');
	const innerCircleShadow = document.querySelector('.inner-circle-shadow');
	const firstCircle = document.querySelector('svg :nth-child(3)');
	const lastCircle = document.querySelector('svg :nth-child(4)');
	const firstRect = document.querySelector('svg rect');
	const textPercent = document.querySelector('.percent-text span');
	const resetBtn = document.querySelector('.reset-button');
	const playBtn = document.querySelector('.play-button');

	let percent = 0.0;
	let percentTmp = 0.0;
	let idInterval = null;
	let isStopped = true;
	const MILLISECONDS = 100;

	function resetState() {
		firstRect.style.setProperty('visibility', 'visible');

		containerCircle.classList.remove('active-shadow');
		innerCircleShadow.classList.remove('active-shadow');

		lastCircle.style.setProperty('--percent', 0);
		firstCircle.style.setProperty('--percent', 0);

		percent = 0.0;
		isStopped = false;
		textPercent.textContent = '0%';
		toogleStateLoad();
	}

	function updatePercent() {
		percent += 0.01;
		percentTmp = percent + 0.01;
		if (percent >= 1) {
			percent = 1;
			percentTmp = 1;
			isStopped = true;
			playBtn.textContent = 'Play';
			firstRect.style.setProperty('visibility', 'hidden');
			containerCircle.classList.add('active-shadow');
			innerCircleShadow.classList.add('active-shadow');
		}
		textPercent.textContent = `${(100 * percent).toFixed(0)}%`;
		lastCircle.style.setProperty('--percent', percent);
		firstCircle.style.setProperty('--percent', percentTmp);
		return percent;
	}
	
	function startLoading() {
		idInterval = setInterval(() => {
			if (updatePercent() >= 1) clearInterval(idInterval);
		}, MILLISECONDS);
	}
	
	function toogleStateLoad() {
		if (percent >= 1) resetState();
		isStopped = !isStopped;
		if (isStopped) {
			clearInterval(idInterval);
			playBtn.textContent = 'Play';
		} else {
			startLoading();
			playBtn.textContent = 'Stop';
		}
	}

	resetBtn.addEventListener('click', resetState)
	playBtn.addEventListener('click', toogleStateLoad);

})()