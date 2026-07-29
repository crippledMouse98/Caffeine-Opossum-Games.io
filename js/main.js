//	 ==============================
//   Caffine Oppossum Games HTML Source 
//   Written By: Jeeves https://github.com/JeevesGB
//   © 2026 JejCo
//   ============================== //

document.addEventListener('DOMContentLoaded', () => {
	const bg = document.querySelector('.parallax-bg');
	if (bg) {
		window.addEventListener('scroll, () => {
			bg.style.transform = 'translateY(${window.scrollY * 0.3}px);
		});
	}
	
	//Mute
	const muteBtn = document.querySelector('.mute-btn');
	if (muteBtn) {
		muteBtn.addEventListener('click', () => {
			muteBtn.classList.toggle('muted');
		});
	}
}