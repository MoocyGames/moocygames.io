const textElements = document.querySelectorAll('.text');
let totalLength = 0; // Toplam karakter uzunluğu

textElements.forEach(textElement => {
    let textContent = textElement.textContent;
    totalLength += textContent.length; // Toplam uzunluğu güncelle
    textElement.innerHTML = '';

    // Harf harf ayır
    Array.from(textContent).forEach(char => {
        const span = document.createElement('span');
        span.textContent = char; // Harfi ekle
        textElement.appendChild(span);

        // Eğer boşluksa, ' ' ile boşluğu muhafaza et
        if (char === ' ') {
            textElement.appendChild(document.createTextNode('\u00A0')); // Boşluk karakteri ekle
        }
    });
});

const spans = document.querySelectorAll('.text span');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const activeCount = Math.floor((scrollY / (document.body.scrollHeight - window.innerHeight)) * totalLength);

            spans.forEach((span, index) => {
                span.classList.toggle('active', index < activeCount);
            });

            ticking = false;
        });
        ticking = true;
    }
});
