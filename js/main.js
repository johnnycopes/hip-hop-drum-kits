function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!audio) return; // stop the function from running altogether

  audio.currentTime = 0; // rewind to the start
  audio.play();

  key.classList.add('playing'); // add animation class to pressed key
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // break out of the function for all event properties apart from transform (it's the slowest)

  this.classList.remove('playing'); // remove animation class from pressed key
}

// select all .keys and listen for the end of their animation, then call a function to remove the animation class
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);
