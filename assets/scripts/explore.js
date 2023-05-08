// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis
  let voices = []
  const voiceSelect = document.getElementById('voice-select')
  function populateVoiceList() {
    voices = synth.getVoices()
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
    
  }
  populateVoiceList();

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  const speakButton = document.querySelector("button");
  const speakImage = document.querySelector("img");
  const textToSpeak = document.getElementById("text-to-speak");


  speakButton.addEventListener("click", (event) => {
    event.preventDefault();

    const utterThis = new SpeechSynthesisUtterance(textToSpeak.value);

    utterThis.addEventListener("start", () => {
      speakImage.src = "assets/images/smiling-open.png";
    });
    utterThis.addEventListener("end", () => {
      speakImage.src = "assets/images/smiling.png";
    });

    const selectedOption = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
  });
}