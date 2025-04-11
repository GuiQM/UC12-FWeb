const mario = document.querySelector('.mario')
const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 450);
}

document.addEventListener('keydown', jump);