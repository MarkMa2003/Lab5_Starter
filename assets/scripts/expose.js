// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornChosen = document.getElementById('horn-select');
  const hornAudio = document.querySelector('audio');
  hornChosen.addEventListener('change', (event) => {
    const hornImage = document.querySelector('img');
    const hornAudio = document.querySelector('audio');
    hornImage.src = `assets/images/${event.target.value}.svg`;
    hornAudio.src = `assets/audio/${event.target.value}.mp3`;
  }
  );

  const volume = document.getElementById('volume');
  volume.addEventListener('change', (event) => {
    const volumeImage = document.querySelector('div img');
    if (event.target.value == 0) {
      volumeImage.src = `assets/icons/volume-level-0.svg`;
    } else if (event.target.value < 33) {
      volumeImage.src = `assets/icons/volume-level-1.svg`;
    } else if (event.target.value < 67) {
      volumeImage.src = `assets/icons/volume-level-2.svg`;
    } else {
      volumeImage.src = `assets/icons/volume-level-3.svg`;
    }
    hornAudio.volume = event.target.value / 100;
  }
  );

  const playButton = document.querySelector('button');
  playButton.addEventListener('click', (event) => {
    hornAudio.play();
    if (hornChosen.value == 'party-horn') {
      const cft = new JSConfetti();
      cft.addConfetti({
        confettiRadius: 5,
        confettiNumber: 999,
      });
    }
  }
  );
}