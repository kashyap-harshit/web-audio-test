let notes = document.querySelectorAll(".notes");
const context = new (window.AudioContext || window.webkitAudioContext)();

const noteValue = [
  { label: "C4", freq: 523.25 },
  { label: "C#4", freq: 554.36 },
  { label: "D4", freq: 587.32 },
  { label: "D#4", freq: 622.26 },
  { label: "E4", freq: 659.26 },
  { label: "F4", freq: 698.46 },
  { label: "F#4", freq: 739.98 },
  { label: "G4", freq: 784.0 },
  { label: "G#4", freq: 830.6 },
  { label: "A4", freq: 880.0 },
  { label: "A#4", freq: 932.32 },
  { label: "B4", freq: 987.76 },
];

let selectedFreqs = [
  { label: "C4", freq: 523.25 },
  { label: "D#4", freq: 622.26 },
  { label: "G4", freq: 784.0 },
];

function handleBeep() {
  selectedFreqs.forEach((freq) => {
    const osc = context.createOscillator();
    osc.type = "square";
    osc.connect(context.destination);
    osc.frequency.value = freq.freq;
    osc.start();
    osc.stop(context.currentTime + 1);
  });
}

notes.forEach((note) => {
  selectedFreqs.forEach((el) => {
    if (el.label.includes(note.innerHTML)) {
      note.style.backgroundColor = "blue";
    }
  });
  note.addEventListener("click", () => {
    if (note.style.backgroundColor === "blue") {
      selectedFreqs = selectedFreqs.filter((el) => {
        return note.innerHTML !== el.label;
      });
      note.style.backgroundColor = "white";
    } else {
      selectedFreqs.push(
        noteValue.filter((el) => {
          return el.label === note.innerHTML;
        })[0]
      );
      note.style.backgroundColor = "blue";
      console.log(selectedFreqs);
    }
  });
});
