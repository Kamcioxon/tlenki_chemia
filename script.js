document.addEventListener('DOMContentLoaded', () => {
    // Nawigacja - aktywne linki
    const linkiNawigacji = document.querySelectorAll('nav ul li a');

    linkiNawigacji.forEach(link => {
        link.addEventListener('click', function(e) {
            // e.preventDefault(); // Możesz odkomentować, jeśli chcesz przewijanie smooth scroll bez zmiany URL
            linkiNawigacji.forEach(item => item.classList.remove('aktywny'));
            this.classList.add('aktywny');

            // Opcjonalnie: smooth scrolling
            const idDocelowe = this.getAttribute('href').substring(1);
            const sekcjaDocelowa = document.getElementById(idDocelowe);
            if (sekcjaDocelowa) {
                sekcjaDocelowa.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Pokaż więcej zdjęć w galerii
    const przyciskWczytajWiecej = document.getElementById('wczytajWiecej');
    const siatkaGalerii = document.querySelector('.gallery');

    // Przykładowe dodatkowe zdjęcia (zastąp własnymi)
    // UWAGA: Upewnij się, że nazwy plików są poprawne i znajdują się w odpowiednim folderze (np. images/)
    const dodatkoweZdjecia = [
        { src: 'magnez.jpg' },
        { src: 'glin.avif' },
        { src: 'tltnki.webp' }, // Upewnij się, że nazwa pliku to 'tlenki.webp'
        { src: 'zelaza.jpg' }
    ];

    let zaladowaneZdjecia = 4; // Początkowa liczba zdjęć w HTML

    if (przyciskWczytajWiecej) {
        przyciskWczytajWiecej.addEventListener('click', () => {
            const fragment = document.createDocumentFragment();
            let nowoDodaneZdjecia = 0;

            // Logika ładowania kolejnych 4 zdjęć
            const startIdx = zaladowaneZdjecia - 4; // Startujemy od indeksu kolejnych zdjęć
            const endIdx = Math.min(startIdx + 4, dodatkoweZdjecia.length); // Kończymy po 4 zdjęciach lub na końcu tablicy

            for (let i = startIdx; i < endIdx; i++) {
                const obraz = dodatkoweZdjecia[i];
                if (obraz) {
                    const elementGalerii = document.createElement('div');
                    elementGalerii.classList.add('galeria');
                    elementGalerii.innerHTML = `
                        <img src="${obraz.src}" alt="${obraz.caption || ''}" class="obraz">
                        `;
                    fragment.appendChild(elementGalerii);
                    nowoDodaneZdjecia++;
                }
            }

            siatkaGalerii.appendChild(fragment);
            zaladowaneZdjecia += nowoDodaneZdjecia;

            // Ukryj przycisk, jeśli wszystkie dostępne zdjęcia zostały załadowane (początkowe + dodatkowe)
            if (zaladowaneZdjecia >= dodatkoweZdjecia.length + 4) {
                przyciskWczytajWiecej.style.display = 'none';
            }
        });
    }

    // Prosta animacja przewijania dla sekcji
    const sekcje = document.querySelectorAll('.wstep');
    const opcjeObserwatora = {
        root: null, // Obserwuj w odniesieniu do viewportu
        rootMargin: '0px',
        threshold: 0.1 // 10% widoczności sekcji uruchamia animację
    };

    const obserwatorSekcji = new IntersectionObserver((wpisy, obserwator) => {
        wpisy.forEach(wpis => {
            if (wpis.isIntersecting) {
                wpis.target.style.opacity = 1;
                wpis.target.style.transform = 'translateY(0)';
            } else {
                // Zresetuj styl, gdy sekcja wyjdzie z widoku (opcjonalnie, można to usunąć)
                wpis.target.style.opacity = 0;
                wpis.target.style.transform = 'translateY(20px)';
            }
        });
    }, opcjeObserwatora);

    sekcje.forEach(sekcja => {
        sekcja.style.opacity = 0; // Początkowo ukryj sekcje
        sekcja.style.transform = 'translateY(20px)'; // Przesuń je lekko w dół
        sekcja.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'; // Dodaj płynną animację
        obserwatorSekcji.observe(sekcja); // Zacznij obserwować sekcję
    });
});

