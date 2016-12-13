const keys = document.querySelectorAll('.key');
const main = document.querySelector('main');
const producers = ['lex-luger', 'mike-will', 'metro-boomin'];
let counter = 0; // used for index of producers array

const audio_808 = document.getElementById('audio_808');
const audio_kick = document.getElementById('audio_kick');
const audio_hat = document.getElementById('audio_hat');
const audio_clap = document.getElementById('audio_clap');
const audio_crash = document.getElementById('audio_crash');
const audio_fx = document.getElementById('audio_fx');
const audio_snare = document.getElementById('audio_snare');
const audio_misc = document.getElementById('audio_misc');
const audio_tag = document.getElementById('audio_tag');

// set inital audio
setAudio(producers[0]);

// drumkit audiof
function setAudio(producer) {
  let _808 = 'audio/' + producer + '-kit/808.wav';
  let _kick = 'audio/' + producer + '-kit/kick.wav';
  let _hat = 'audio/' + producer + '-kit/hat.wav';
  let _clap = 'audio/' + producer + '-kit/clap.wav';
  let _crash = 'audio/' + producer + '-kit/crash.wav';
  let _fx = 'audio/' + producer + '-kit/fx.wav';
  let _snare = 'audio/' + producer + '-kit/snare.wav';
  let _misc = 'audio/' + producer + '-kit/misc.wav';
  let _tag = 'audio/' + producer + '-kit/tag.mp3';

  audio_808.setAttribute('src', _808);
  audio_kick.setAttribute('src', _kick);
  audio_hat.setAttribute('src', _hat);
  audio_clap.setAttribute('src', _clap);
  audio_crash.setAttribute('src', _crash);
  audio_fx.setAttribute('src', _fx);
  audio_snare.setAttribute('src', _snare);
  audio_misc.setAttribute('src', _misc);
  audio_tag.setAttribute('src', _tag);
}


function keypress(e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio && !changeKit) return; // stop the function from running altogether

  if (audio) {
    audio.currentTime = 0; // restart the audio
    audio.play();
  }
  else {
    changeKit(key);
  }
  key.classList.add('pressed'); // add animation class to pressed key
}

function changeKit(key) {
  main.className = ''; // clear bg classes out
  if (key.classList.contains('left') && counter > 0) {
    counter--;
  }
  else if (key.classList.contains('right') && counter < producers.length - 1) {
    counter++;
  }
  main.classList.add(producers[counter], 'splash'); // add bg img pic and styling

  // sub out audio files
  let producer = producers[counter];
  setAudio(producer);
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // break out of the function for all event properties apart from transform (it's the slowest)
  this.classList.remove('pressed'); // remove animation class from pressed key
}

// listen for the end of the keys' animation, then call a function to remove the animation class

keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', keypress);
