const keys = document.querySelectorAll('.key');
const main = document.querySelector('main');
const producers = ['lex-luger', 'mike-will', 'metro-boomin'];
let counter = 0;

function keypress(e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio && !changeKit) return; // stop the function from running altogether

  if (audio) {
    audio.currentTime = 0; // rewind to the start
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
  main.classList.add(producers[counter], 'splash');
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // break out of the function for all event properties apart from transform (it's the slowest)
  this.classList.remove('pressed'); // remove animation class from pressed key
}

// listen for the end of the keys' animation, then call a function to remove the animation class

keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', keypress);
