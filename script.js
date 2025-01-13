document.addEventListener('DOMContentLoaded', function() {
  let timer;
  let isPaused = false;
  let remainingTime = 0;
  let buttons = Array.from(document.querySelectorAll('.button')); //array

  // Add a click event listener to each button
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      console.log('Button was clicked!');
    });
    // Set the button background color
    button.style.backgroundColor = 'teal';
  });

  function updateDisplay(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    document.getElementById('timer').textContent =
      (minutes < 10 ? '0' : '') + minutes + ':' +
      (seconds < 10 ? '0' : '') + seconds;
  }

  function showImage() {
    const img = document.getElementById('timerImage');
    img.src = 'img/timesup.gif'; // Replace with actual image path
    img.hidden = false;
    // Play the sound
    const sound = document.getElementById('timerSound');
    sound.play();
  }

  function updateDisplayStyle(timeUp) {
    const timerElement = document.getElementById('timer');
    timerElement.className = timeUp ? 'time-up' : '';
  }

  function startTimer() {
    let minutes = parseInt(document.getElementById('minutes').value) || 0;
    let seconds = parseInt(document.getElementById('seconds').value) || 0;
    remainingTime = minutes * 60 + seconds;
    updateDisplay(remainingTime);
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(function() {
      if (!isPaused && remainingTime > 0) {
        remainingTime--;
        updateDisplay(remainingTime);
      } else if (remainingTime === 0) {
        clearInterval(timer);
        updateDisplayStyle(true);
        showImage();
        alert("Time's up!");
      }
    }, 1000);
  }

  function pauseTimer() {
    isPaused = true;
  }

  function resumeTimer() {
    isPaused = false;
  }

  function resetTimer() {
    clearInterval(timer);
    remainingTime = 0;
    updateDisplayStyle(false);
    hideImage();
    const sound = document.getElementById('timerSound');
    if (sound) {
      sound.pause(); // Pause the sound if it's playing
      sound.currentTime = 0; // Reset the sound to the start
    }
    updateDisplay(remainingTime);
    document.getElementById('minutes').value = ''; // Reset minutes input
    document.getElementById('seconds').value = ''; // Reset seconds input
    function hideImage() {
      const img = document.getElementById('timerImage');
      if (img) {
        img.hidden = true; // This will hide the image element
      }
    }
  }

  document.getElementById('startButton').addEventListener('click', startTimer);
  document.getElementById('pauseButton').addEventListener('click', pauseTimer);
  document.getElementById('resumeButton').addEventListener('click', resumeTimer);
  document.getElementById('resetButton').addEventListener('click', resetTimer);
});
