// Initialize Lucide Icons
lucide.createIcons();

// --- Matrix Rain Effect ---
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const characters = "01ABCDEF-/.";
const fontSize = 14;
const columns = Math.floor(width / fontSize);
const drops = new Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 12, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#0ea5e9'; // Cyan color
    ctx.font = `${fontSize}px JetBrains Mono`;
    
    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// --- Typewriter Effect ---
const typewriterText = "SOC ANALYST (L1/L2) | AZURE SECURITY SPECIALIST | MICROSOFT SENTINEL EXPERT";
const typewriterElement = document.getElementById('typewriter');
let charIndex = 0;

function typeWriter() {
    if (charIndex < typewriterText.length) {
        typewriterElement.textContent += typewriterText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
    }
}

// Start typewriter after a small delay
setTimeout(typeWriter, 1000);

// --- Time Update ---
function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    timeElement.textContent = `TIMESTAMP: ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
}
setInterval(updateTime, 1000);
updateTime();

// --- Log Feed Animation ---
const logs = [
    "[INFO] Initializing Splunk Enterprise Indexer...",
    "[WARN] Anomalous login detected via Splunk Search...",
    "[INFO] Scanning Azure Entra ID logs for public access...",
    "[SUCCESS] SPL query: Potential exfiltration blocked.",
    "[INFO] Monitoring Microsoft Sentinel for critical alerts...",
    "[ALERT] Brute force attack detected on Unit-01.",
    "[INFO] Orchestrating Splunk Phantom Playbook...",
    "[INFO] Analyzing network flow via Splunk Stream...",
    "[SUCCESS] Security Dashboard V2.1 synchronized."
];

const logFeed = document.getElementById('log-feed');
let logIndex = 0;

function addLog() {
    const log = document.createElement('div');
    log.className = 'opacity-0 translate-y-2 transition-all duration-500 font-mono text-[12px]';
    log.innerHTML = `<span class="text-cyan-500 mr-2">></span> ${logs[logIndex]}`;
    logFeed.prepend(log);
    
    setTimeout(() => {
        log.classList.remove('opacity-0', 'translate-y-2');
    }, 100);

    if (logFeed.children.length > 8) {
        logFeed.removeChild(logFeed.lastChild);
    }

    logIndex = (logIndex + 1) % logs.length;
}

setInterval(addLog, 3000);
addLog();

// --- Music Player (Direct Audio Stream) ---
const audio = document.getElementById('bg-music');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress');

// Function to handle play/pause
function togglePlay() {
    if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                playIcon.setAttribute('data-lucide', 'pause');
                lucide.createIcons();
            }).catch(error => {
                console.error("Playback failed:", error);
                // Fallback: If one source fails, try another
                if (!audio.src.includes('soundhelix')) {
                    audio.src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3';
                    audio.play();
                }
            });
        }
    } else {
        audio.pause();
        playIcon.setAttribute('data-lucide', 'play');
        lucide.createIcons();
    }
}

playBtn.addEventListener('click', togglePlay);

audio.addEventListener('timeupdate', () => {
    if (audio.duration > 0) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percent}%`;
    }
});

// Reset icon when audio ends (though it's set to loop)
audio.addEventListener('ended', () => {
    playIcon.setAttribute('data-lucide', 'play');
    lucide.createIcons();
});

// --- Scroll Animations (Intersection Observer) ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
