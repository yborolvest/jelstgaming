<div class="back-to-jelst">
	<a href="../">Terug naar home</a>
</div>
<div class="jelst-audio">
	<audio id="background-audio" src="/assets/audio/sunshine_casino.mp3" autoplay loop></audio>
	<input id="volume-slider" type="range" min="0" max="100" value="15" step="1">
	<script>
		const excludedPages = ['/daily/', '/jelst/'];
		const audioTracks = [
			'/assets/audio/sunshine_casino.mp3',
			'/assets/audio/l_casino.mp3',
			'/assets/audio/world_bowser.mp3'
		];
		// disable if page is on the excluded list
		if (excludedPages.includes(window.location.pathname)) {
			document.querySelector('.jelst-audio').style.display = 'none';
			document.querySelector('#background-audio').remove();
		}




		const randomIndex = Math.floor(Math.random() * audioTracks.length);
		const audioElement = document.getElementById('background-audio');
		audioElement.src = audioTracks[randomIndex];

		// control volume with the slider

		const volumeSlider = document.getElementById('volume-slider');
		volumeSlider.addEventListener('input', function() {
			audioElement.volume = volumeSlider.value / 100;
		});

		// set the volume to the initial value
		audioElement.volume = volumeSlider.value / 100;

	</script>
	
	</audio>
</div>