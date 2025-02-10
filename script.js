document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.querySelector('.no-btn');
    const yesBtn = document.querySelector('.yes-btn');
    const loveQuestion = document.querySelector('.love-question');
    const celebration = document.querySelector('.celebration');

    // Move the "No" button away from cursor
    noBtn.addEventListener('mouseover', (e) => {
        // Calculate a new position that's not too close to the current position
        const buttonRect = noBtn.getBoundingClientRect();
        let newX, newY;
        
        do {
            newX = Math.random() * (window.innerWidth - buttonRect.width);
            newY = Math.random() * (window.innerHeight - buttonRect.height);
        } while (
            // Ensure the new position is at least 200px away from current position
            Math.abs(newX - buttonRect.x) < 200 &&
            Math.abs(newY - buttonRect.y) < 200
        );

        // Keep button within viewport
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${Math.min(Math.max(0, newX), window.innerWidth - buttonRect.width)}px`;
        noBtn.style.top = `${Math.min(Math.max(0, newY), window.innerHeight - buttonRect.height)}px`;
    });

    // Handle "Yes" button click
    yesBtn.addEventListener('click', () => {
        loveQuestion.style.display = 'none';
        celebration.style.display = 'block';
        createFlowerRain();
        // Create extra floating hearts
        for(let i = 0; i < 20; i++) {
            setTimeout(() => {
                createFloatingHeart(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 100);
        }
    });
});

function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💜';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.transition = 'all 1s ease-in-out';
    heart.style.opacity = '1';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.transform = `translateY(-100px) rotate(${Math.random() * 90 - 45}deg)`;
        heart.style.opacity = '0';
    }, 50);
    
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 1000);
}

function createFlowerRain() {
    const flowers = ['🌸', '🌷', '🌺', '💐', '🌹'];
    for(let i = 0; i < 50; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'flower-rain';
            flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = `${Math.random() * 100}vw`;
            flower.style.animationDuration = `${2 + Math.random() * 2}s`;
            document.body.appendChild(flower);
            
            // Remove flower after animation
            setTimeout(() => {
                document.body.removeChild(flower);
            }, 3000);
        }, i * 100);
    }
}
