// --- ส่วนของเอฟเฟกต์หัวใจลอย ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    // สุ่มสิ่งที่จะให้ลอย (ใส่อีโมจิ หรือ รูปภาพ ก็ได้)
    const items = [
        '💖', '💕', '💘', '💗', '💓', '✨', '🌸',
        '<img src="https://cdn.discordapp.com/attachments/1456305204965408769/1465807677631365150/IMG_20260122_020018.jpg?ex=69a3fa87&is=69a2a907&hm=2204fd9e6b1882953fe650562a53327d8c431bb2f1ac71baf90dcb7d5b60c8af&" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid white; box-shadow: 0 4px 8px rgba(255,105,135,0.4);">',
        '<img src="https://cdn.discordapp.com/attachments/1456305204965408769/1465809330266706253/IMG_20260118_023306_617.jpg?ex=69a3fc11&is=69a2aa91&hm=2a29f3436dc52962626086e1598f57df9622cf6a175938a5c66ca96a446726e5&" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid white; box-shadow: 0 4px 8px rgba(255,105,135,0.4);">',
        '<img src="https://github.com/face12345678/pp.facem/blob/main/aa.jpg?raw=true" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid white; box-shadow: 0 4px 8px rgba(255,105,135,0.4);">'
    ];
    heart.innerHTML = items[Math.floor(Math.random() * items.length)];

    // สุ่มตำแหน่งเริ่มต้นที่ขอบล่าง
    heart.style.left = Math.random() * 100 + 'vw';

    // สุ่มเวลาอนิเมชันให้หัวใจลอยเร็ว-ช้าต่างกัน
    const duration = Math.random() * 3 + 4; // 4 to 7 วินาที
    heart.style.animationDuration = duration + 's, 2s'; // สำหรับ floatUp และ sway

    // สุ่มขนาด
    heart.style.fontSize = Math.random() * 15 + 15 + 'px';

    document.getElementById('hearts-container').appendChild(heart);

    // ลบหัวใจเมื่อลอยพ้นจอไปแล้วเพื่อไม่ให้ค้างในระบบ
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// สร้างหัวใจใหม่ทุกๆ 400ms
setInterval(createHeart, 400);

// --- ส่วนของเครื่องเล่นเพลง ---
let isMusicPlaying = false;

function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicPlayer = document.getElementById('music-player');

    if (!bgMusic) return;

    if (isMusicPlaying) {
        // ถ้าเล่นอยู่ ให้หยุด
        bgMusic.pause();
        musicPlayer.classList.remove('playing');
        isMusicPlaying = false;
    } else {
        // ถ้าหยุดอยู่ ให้เล่น
        bgMusic.volume = 0.5;
        bgMusic.play().then(() => {
            musicPlayer.classList.add('playing');
            isMusicPlaying = true;
        }).catch(e => console.log("รอให้ผู้ใช้คลิกก่อนเล่นเพลง"));
    }
}

// ปรับระดับเสียงจากปุ่ม + / -
function changeVolume(delta) {
    const bgMusic = document.getElementById('bgMusic');
    if (!bgMusic) return;
    let v = bgMusic.volume + delta;
    if (v > 1) v = 1;
    if (v < 0) v = 0;
    bgMusic.volume = v;
}

// --- ส่วนของการ์ดเอนิเมชัน ---
let isOpen = false;

function openEnvelope() {
    if (!isOpen) {
        // เปิดซอง
        document.getElementById('envelope').classList.add('open');

        // เปลี่ยนข้อความหัวเรื่อง
        document.querySelector('.title').innerHTML = "รักนะคะ 🥰";

        // ซ่อนคำแนะนำ
        document.getElementById('helper-text').style.display = 'none';

        // เล่นเพลงถ้ายังไม่เล่น
        const bgMusic = document.getElementById('bgMusic');
        const musicPlayer = document.getElementById('music-player');
        if (bgMusic && !isMusicPlaying) {
            bgMusic.volume = 0.5;
            bgMusic.play().then(() => {
                musicPlayer.classList.add('playing');
                isMusicPlaying = true;
            }).catch(e => console.log("ต้องกดปุ่มหรือมีปฏิสัมพันธ์ก่อนเล่นเพลงจ้า"));
        }

        // ดีเลย์โชว์รูปภาพตามหลัง (แสดงทุกฮีดดิ้งที่มีคลาส .gallery-title)
        setTimeout(() => {
            const titles = document.querySelectorAll('.gallery-title');
            titles.forEach(el => el.style.display = 'block');
            // force reflow for each element
            titles.forEach(el => void el.offsetWidth);
            titles.forEach(el => el.classList.add('visible'));

            document.getElementById('gallery').classList.add('visible');
        }, 1200);

        // โปรยหัวใจฉลอง
        for (let i = 0; i < 30; i++) {
            setTimeout(createHeart, i * 60);
        }

        isOpen = true;
    }
}
