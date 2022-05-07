
const intro = document.getElementById('intro');

const introTitle = document.getElementById('intro-title');
const introDetails = document.getElementById('intro-details');
const introHours = document.getElementById('intro-hours');

const audio = document.querySelector('audio');
const preBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const playerImg = document.getElementById('player-img');
const playerTitle = document.getElementById('player-title');
const playerDesc = document.getElementById('player-desc');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const podcast = [
    {
        name: 'podcast-1',
        host: 'Seth Rogen',
        desc: 'War of Worlds or Lords'

    },
    {
        name: 'podcast-2',
        host: 'Miriam Chopper',
        desc: 'How become a veg?'
    }
];

let isPlaying = false;

function playAudio() {
    isPlaying = true;
    playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
    playBtn.setAttribute('title', 'Pause');
    audio.play();
}

function pauseAudio() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause-circle', 'fa-play-circle');
    playBtn.setAttribute('title', 'Play');
    audio.pause();
}

playBtn.addEventListener('click', () => {
    isPlaying ? pauseAudio() : playAudio();
});

function loadPodcast(podcast) {
    audio.src = `mp3/${podcast.name}.mp3`;
    playerTitle.textContent = podcast.host;
    introTitle.textContent = podcast.host;
    playerDesc.textContent = podcast.desc;
    introDetails.textContent = podcast.desc;
    playerImg.src = `img/${podcast.name}.jpg`;
    playerImg.setAttribute('alt', `${podcast.name}`);
    intro.style.backgroundImage = `linear-gradient(to bottom, rgba(245, 246, 252, 0), rgba(0, 0, 0, 0.7)), url(img/${podcast.name}.jpg)`;
}

let podIndex = 0;

function prevPodcast() {
    podIndex--;
    if(podIndex < 0) podIndex = podcast.length - 1;
    loadPodcast(podcast[podIndex]);
    playAudio();
}

function nextPodcast() {
    podIndex++;
    if(podIndex > podcast.length - 1) podIndex = 0;
    loadPodcast(podcast[podIndex]);
    playAudio();
}

loadPodcast(podcast[podIndex]);

function updateProgressBar(e) {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        let durationMin = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        durationSeconds < 10 ? durationSeconds = `0${durationSeconds}` : durationSeconds;
        if(durationSeconds) {
            durationEl.textContent = `${durationMin}:${durationSeconds}`;
            introHours.textContent = `${durationMin}:${durationSeconds}`;
        };
 
        let currentMin = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        currentSeconds < 10 ? currentSeconds = `0${currentSeconds}` : currentSeconds;
        currentTimeEl.textContent = `${currentMin}:${currentSeconds}`;
    }
}

function setProgressBar(e) {
    let width = e.srcElement.clientWidth;
    let clickX = e.offsetX;
    const {duration} = audio;
    audio.currentTime = (clickX / width) * duration;
}

preBtn.addEventListener('click', prevPodcast);
nextBtn.addEventListener('click', nextPodcast);
audio.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);