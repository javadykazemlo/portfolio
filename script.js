const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});


const tiltCards = document.querySelectorAll(
    ".about, .project-card, .skill-card"
);

tiltCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY =
            (x / rect.width - 0.5) * 10;

        const rotateX =
            -(y / rect.height - 0.5) * 10;

        card.style.transform =
            `perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.03)`;
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });

});


const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    reveals.forEach(item => {

        const windowHeight = window.innerHeight;

        const elementTop =
            item.getBoundingClientRect().top;

        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {

            item.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();

const sections = document.querySelectorAll(
    "section, .card"
);

const navLinks = document.querySelectorAll("nav a");

navLinks[0].classList.add("active");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.clientHeight;

        if (
            window.scrollY >=
            sectionTop - 250
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");
        }
    });

});

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");
    }

    else {

        backToTop.classList.remove("show");
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"
    });

});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];


class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 3 + 1;

        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width)
            this.speedX *= -1;

        if (this.y < 0 || this.y > canvas.height)
            this.speedY *= -1;
    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(0,191,255,0.7)";

        ctx.fill();
    }
}

function initParticles() {

    particlesArray = [];

    for (let i = 0; i < 80; i++) {

        particlesArray.push(
            new Particle()
        );
    }
}

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particlesArray.forEach(particle => {

        particle.update();
        particle.draw();
    });

    for (let a = 0; a < particlesArray.length; a++) {

        for (let b = a; b < particlesArray.length; b++) {

            let dx =
                particlesArray[a].x -
                particlesArray[b].x;

            let dy =
                particlesArray[a].y -
                particlesArray[b].y;

            let distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                ctx.beginPath();

                ctx.strokeStyle =
                    `rgba(0,191,255,${
                        1 - distance / 120
                    })`;

                ctx.lineWidth = 0.5;

                ctx.moveTo(
                    particlesArray[a].x,
                    particlesArray[a].y
                );

                ctx.lineTo(
                    particlesArray[b].x,
                    particlesArray[b].y
                );

                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(
        animateParticles
    );
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initParticles();
});

const heroContainer =
    document.getElementById("hero-3d");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    1,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setSize(180, 180);

heroContainer.appendChild(renderer.domElement);

const geometry =
    new THREE.DodecahedronGeometry(
        2
    );



const material =
    new THREE.MeshBasicMaterial({

        color: 0x00bfff,

        wireframe: true,

        transparent: true,

        opacity: 0.7
    });

const shape =
    new THREE.Mesh(
        geometry,
        material
    );

scene.add(shape);

const starsGeometry =
    new THREE.BufferGeometry();

const starsCount = 200;

const positions = [];

for (let i = 0; i < starsCount; i++) {

    positions.push(
        (Math.random() - 0.5) * 10
    );

    positions.push(
        (Math.random() - 0.5) * 10
    );

    positions.push(
        (Math.random() - 0.5) * 10
    );
}

starsGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(
        positions,
        3
    )
);

const starsMaterial =
    new THREE.PointsMaterial({

        color: 0xffffff,

        size: 0.05
    });

const stars =
    new THREE.Points(
        starsGeometry,
        starsMaterial
    );

scene.add(stars);

camera.position.z = 5;

document.addEventListener("mousemove", (e) => {

    const x =
        (e.clientX / window.innerWidth - 0.5);

    const y =
        (e.clientY / window.innerHeight - 0.5);

    shape.rotation.y = x;
    shape.rotation.x = y;
});

function animate3D() {

    requestAnimationFrame(animate3D);

    shape.rotation.y += 0.003;

    stars.rotation.y += 0.001;

    stars.rotation.x += 0.0005;

    renderer.render(scene, camera);
}

animate3D();


const progressBar =
    document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / scrollHeight) * 100;

    progressBar.style.width =
        `${progress}%`;
});

const loader =
    document.querySelector(".loader");

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1200);

});


const menuToggle =
    document.querySelector(".menu-toggle");

const nav =
    document.querySelector("nav");

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("show");

});