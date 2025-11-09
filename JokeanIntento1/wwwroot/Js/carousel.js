window.initCarousel = () => {
    const carousel = document.querySelector(".carousel");
    const cards = document.querySelectorAll(".memory-card");
    const btnLeft = document.querySelector(".control-btn.left");
    const btnRight = document.querySelector(".control-btn.right");

    if (!carousel || cards.length === 0) return;

    let currentAngle = 0;
    const totalCards = cards.length;
    const anglePerCard = 360 / totalCards;
    const radius = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--carousel-radius")) || 400;

    // 🔄 Colocar las tarjetas en círculo 3D
    cards.forEach((card, i) => {
        const angle = i * anglePerCard;
        const x = Math.sin((angle * Math.PI) / 180) * radius;
        const z = Math.cos((angle * Math.PI) / 180) * radius;
        card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });

    // 🚀 Función para rotar el carrusel
    const rotateCarousel = (direction) => {
        currentAngle += direction * anglePerCard;
        carousel.style.transform = `rotateY(${currentAngle}deg)`;
    };

    // 🎮 Botones de control
    if (btnLeft) btnLeft.addEventListener("click", () => rotateCarousel(-1));
    if (btnRight) btnRight.addEventListener("click", () => rotateCarousel(1));

    // 🎹 Control con teclado (flechas izquierda y derecha)
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            rotateCarousel(-1);
        } else if (e.key === "ArrowRight") {
            rotateCarousel(1);
        }
    });

    // 🖱️ Control por arrastre (mouse/touch)
    let startX = 0;
    let isDragging = false;

    const onDragStart = (e) => {
        isDragging = true;
        startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    };

    const onDragMove = (e) => {
        if (!isDragging) return;
        const x = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
        const diff = x - startX;
        carousel.style.transform = `rotateY(${currentAngle + diff * 0.2}deg)`;
    };

    const onDragEnd = (e) => {
        if (!isDragging) return;
        const x = e.type.includes("mouse") ? e.clientX : e.changedTouches[0].clientX;
        const diff = x - startX;
        currentAngle += diff * 0.2;
        isDragging = false;
    };

    carousel.addEventListener("mousedown", onDragStart);
    carousel.addEventListener("mousemove", onDragMove);
    carousel.addEventListener("mouseup", onDragEnd);
    carousel.addEventListener("mouseleave", onDragEnd);

    carousel.addEventListener("touchstart", onDragStart);
    carousel.addEventListener("touchmove", onDragMove);
    carousel.addEventListener("touchend", onDragEnd);

    // 🧠 Flip de tarjeta al hacer clic
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
                setTimeout(() => card.classList.remove("flipped"), 2000);
            }
        });
    });

    console.log("🌀 Carrusel 3D inicializado con", totalCards, "tarjetas y control por teclado activado");
};
