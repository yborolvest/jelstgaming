const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});
document.addEventListener('click', () => {
    cursor.classList.add('expand');
    setTimeout(() => {
        cursor.classList.remove('expand');
    }, 200);
});

const footerTime = document.querySelector('.footer-current-time');
setInterval(() => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    footerTime.innerText = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}, 1000);

const clickaudio = new Audio('/assets/audio/WSD-SELECT.mp3');
const hoveraudio = new Audio('/assets/audio/Sample_0003.mp3');
const successSound = new Audio('/assets/audio/COPY-FINISH.mp3');


const introSeq = document.querySelector('.intro-sequence-container');
hoveraudio.volume = 0.5;
clickaudio.volume = 0.3;
document.addEventListener('keydown', (e) => {
    if (e.key === 'a' && introSeq.style.display !== 'none') {
        removeIntro();
    }
});
function removeIntro() {
    const bgaudio = new Audio('/assets/audio/wii-ambient.mp3');
    // bg audio volume
    bgaudio.volume = 0.1;
    bgaudio.play();
    introSeq.style.opacity = '0';
    
    setTimeout(() => {
        introSeq.style.display = 'none';
    }, 1000);
}
// on mouse click, play click sound
document.addEventListener('click', () => {
    clickaudio.play();
});

// toggle hidden class of .footer-username-form on click of .footer-username-btn
const footerUsernameBtn = document.querySelector('.footer-username-btn');
const footerUsernameForm = document.querySelector('.footer-username-form');
footerUsernameBtn.addEventListener('click', () => {
    footerUsernameForm.classList.toggle('hidden');
});

// toggle hidden class of .footer-leaderboard on click of .footer-leaderboard-btn
const footerLeaderboardBtn = document.querySelector('.footer-leaderboard-btn');
const footerLeaderboard = document.querySelector('.footer-leaderboard');
footerLeaderboardBtn.addEventListener('click', () => {
    footerLeaderboard.classList.toggle('hidden');
});


// on click #saveUserName, save the username
const saveUserName = document.querySelector('#saveUserName');
const userNameInput = document.querySelector('#userName');
const userNameAlert = document.querySelector('#userNameAlert');

saveUserName.addEventListener('click', () => {
    // check if username is available and not empty
    if (userNameInput.value !== '') {
        IsAvailable(userNameInput.value).then(available => {
            if (available.valueOf()) {
                SetNickname(userNameInput.value).then(() => {
                    GetNickname().then(nickname => {
                        console.log(nickname);
                        userNameAlert.classList.remove('alert-danger');
                        userNameAlert.classList.add('alert-success');
                        userNameAlert.innerText = 'Username saved!';
                        successSound.play();
                        setTimeout(() => {
                            footerUsernameForm.classList.add('hidden');
                        }, 3000);
                    });
                });
            } else {
                userNameAlert.classList.remove('alert-success');
                userNameAlert.classList.add('alert-danger');
                userNameAlert.innerText = 'Username is not available!';
            }
        });
    } else {
        userNameAlert.classList.remove('alert-success');
        userNameAlert.classList.add('alert-danger');
        userNameAlert.innerText = 'Username cannot be empty!';
    }
});

// get leaderboard and insert into .leaderboard-inner ul

const leaderboardInner = document.querySelector('#leaderboardList');
getTopPlayers().then(players => {
    // get the json response from the api and insert into the leaderboard
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.innerText = player.name + ' | ' + player.credits + ' credits';
        if (index < 3) {
            li.classList.add('top-player-' + (index + 1));
        }
        leaderboardInner.appendChild(li);
    });
});

// get current credits and insert into .footer-credits
const footerCredits = document.querySelector('.footer-credits-count');
GetCredits().then(credits => {
    footerCredits.innerText = "Your credits: " + credits + " credits";
});


const dailyLink = document.querySelector('.footer-credits-daily-link');
CheckDailyAvailable().then(available => {
    if (!available) {
        // change daily link to "Check back tomorrow" and remove href
        dailyLink.innerText = 'Check back tomorrow for your dailies!';
        dailyLink.removeAttribute('href');
    } else {
       
        
    }
});