

document.addEventListener('DOMContentLoaded', () => {

    // ─── PAGE LOADER (FADE OUT) ───
    const loader = document.getElementById('loader');
    if (loader) {
        const hideLoader = () => {
            loader.classList.add('loader--hidden');
            setTimeout(() => {
                if (loader.parentNode) loader.remove();
            }, 600); // Matches snappy CSS transition
        };

        // Hide as soon as page is fully loaded
        window.addEventListener('load', hideLoader);

        // Fallback: If page takes too long (e.g. slow images), hide after 3 seconds anyway
        setTimeout(hideLoader, 3000);
    }

    // ─── ELEMENTS ───
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // ─── STICKY HEADER WITH BLUR ───
    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ─── MOBILE MENU TOGGLE ───
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ─── ACTIVE NAV LINK ON SCROLL ───
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ─── REVEAL ON SCROLL / LOAD ANIMATIONS ───
    const revealElements = document.querySelectorAll('.animate-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ─── ANIMATED COUNTER (Stats) ───
    const statNumbers = document.querySelectorAll('.stat__number[data-target]');
    let countersStarted = false;

    const animateCounters = () => {
        statNumbers.forEach(numEl => {
            const target = +numEl.getAttribute('data-target');
            const duration = 2000; // ms
            const start = performance.now();

            const step = (now) => {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);

                // Ease-out cubic
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(ease * target);

                numEl.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };

            requestAnimationFrame(step);
        });
    };

    // Trigger counters when stats section is in view
    const statsContainer = document.querySelector('.hero__stats');
    if (statsContainer) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsContainer);
    }

    // ─── SMOOTH SCROLL FOR CTA BUTTONS ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const top = targetEl.offsetTop - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ─── PARALLAX GLOW BLOBS ON MOUSE MOVE ───
    const glows = document.querySelectorAll('.hero__glow');

    if (window.matchMedia('(min-width: 769px)').matches) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const moveX = (clientX - centerX) / centerX;
            const moveY = (clientY - centerY) / centerY;

            glows.forEach((glow, i) => {
                const speed = (i + 1) * 12;
                glow.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });
        });
    }

    // ─── BUTTON RIPPLE EFFECT ───
    document.querySelectorAll('.btn--primary').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Ripple keyframes (injected once)
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to { transform: scale(2.5); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ─── PRODUCT CARD CAROUSELS ───
    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel__slide');
        const dots = carousel.querySelectorAll('.carousel__dot');
        const prevBtn = carousel.querySelector('.carousel__btn--prev');
        const nextBtn = carousel.querySelector('.carousel__btn--next');
        let currentSlide = 0;
        let autoSlideInterval = null;

        const goToSlide = (index) => {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        };

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(+dot.getAttribute('data-slide'));
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
        }

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 4000);
        };

        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };

        startAutoSlide();

        const card = carousel.closest('.product-card');
        if (card) {
            card.addEventListener('mouseenter', stopAutoSlide);
            card.addEventListener('mouseleave', startAutoSlide);
        }

        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToSlide(currentSlide + 1);
                } else {
                    goToSlide(currentSlide - 1);
                }
            }
        }, { passive: true });
    });

    // ─── ABOUT CAROUSEL (Horizontal Scroll) ───
    const aboutTrack = document.getElementById('about-carousel-track');
    const aboutPrev = document.getElementById('about-prev');
    const aboutNext = document.getElementById('about-next');
    const aboutProgress = document.getElementById('about-progress-bar');

    if (aboutTrack) {
        const scrollAmount = 344;

        aboutPrev.addEventListener('click', () => {
            aboutTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        aboutNext.addEventListener('click', () => {
            aboutTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        aboutTrack.addEventListener('scroll', () => {
            const maxScroll = aboutTrack.scrollWidth - aboutTrack.clientWidth;
            const progress = maxScroll > 0 ? (aboutTrack.scrollLeft / maxScroll) * 100 : 0;
            aboutProgress.style.width = `${Math.max(15, Math.min(100, progress))}%`;
        }, { passive: true });

        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        aboutTrack.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - aboutTrack.offsetLeft;
            scrollLeft = aboutTrack.scrollLeft;
            aboutTrack.style.cursor = 'grabbing';
        });

        aboutTrack.addEventListener('mouseleave', () => {
            isDragging = false;
            aboutTrack.style.cursor = 'grab';
        });

        aboutTrack.addEventListener('mouseup', () => {
            isDragging = false;
            aboutTrack.style.cursor = 'grab';
        });

        aboutTrack.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - aboutTrack.offsetLeft;
            const walk = (x - startX) * 1.5;
            aboutTrack.scrollLeft = scrollLeft - walk;
        });
    }

    // ─── ABOUT MODAL (Expand Card) ───
    const aboutCards = document.querySelectorAll('.about-card');
    const aboutModal = document.getElementById('about-modal');
    const modalClose = document.getElementById('about-modal-close');
    const modalBackdrop = document.getElementById('about-modal-backdrop');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalDetail = document.getElementById('modal-detail');
    const modalCounter = document.getElementById('modal-counter');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');

    let currentModalIndex = 0;
    const totalCards = aboutCards.length;

    const openModal = (index) => {
        if (index < 0 || index >= totalCards) return;
        currentModalIndex = index;

        const card = aboutCards[index];
        const iconHTML = card.querySelector('.about-card__icon').innerHTML;
        const title = card.querySelector('.about-card__title').textContent;
        const desc = card.querySelector('.about-card__desc').textContent;
        const detail = card.querySelector('.about-card__detail').textContent;

        modalIcon.innerHTML = iconHTML;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalDetail.textContent = detail;
        modalCounter.textContent = `${index + 1} / ${totalCards}`;

        aboutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        aboutModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    aboutCards.forEach((card, i) => {
        card.addEventListener('click', () => openModal(i));
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    if (modalPrev) {
        modalPrev.addEventListener('click', () => {
            openModal((currentModalIndex - 1 + totalCards) % totalCards);
        });
    }
    if (modalNext) {
        modalNext.addEventListener('click', () => {
            openModal((currentModalIndex + 1) % totalCards);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (!aboutModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') openModal((currentModalIndex - 1 + totalCards) % totalCards);
        if (e.key === 'ArrowRight') openModal((currentModalIndex + 1) % totalCards);
    });

    const modalContainer = document.getElementById('about-modal-container');

    if (modalContainer) {
        let modalTouchStartX = 0;
        modalContainer.addEventListener('touchstart', (e) => {
            modalTouchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        modalContainer.addEventListener('touchend', (e) => {
            const diff = modalTouchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 60) {
                if (diff > 0) {
                    openModal((currentModalIndex + 1) % totalCards);
                } else {
                    openModal((currentModalIndex - 1 + totalCards) % totalCards);
                }
            }
        }, { passive: true });
    }

    // ─── CONTACT FORM HANDLING ───
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('contact-submit');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const originalText = submitBtn.querySelector('span').textContent;
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.classList.add('btn--loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.querySelector('span').textContent = 'Message Sent!';
                submitBtn.classList.remove('btn--loading');
                submitBtn.classList.add('btn--success');
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.classList.remove('btn--success');
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // ─── FAQ ACCORDION ───
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(otherItem => otherItem.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });

    // ─── NEWSLETTER FORM ───
    const newsletterForm = document.querySelector('.newsletter__form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const submitBtn = newsletterForm.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribed!';
            submitBtn.style.background = '#00c853';
            submitBtn.disabled = true;
            input.value = '';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }

    // ─── HERO SLIDER (AUTOMATIC & MANUAL) ───
    const heroTrack = document.getElementById('hero-slider-track');
    const heroPrev = document.getElementById('hero-prev');
    const heroNext = document.getElementById('hero-next');
    
    if (heroTrack && heroPrev && heroNext) {
        let currentHeroSlide = 0;
        const heroSlides = heroTrack.querySelectorAll('.hero-slider__slide');
        const totalHeroSlides = heroSlides.length;
        let heroInterval;

        const updateHeroSlider = () => {
            heroTrack.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
        };

        const nextHeroSlide = () => {
            currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
            updateHeroSlider();
        };

        const prevHeroSlide = () => {
            currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
            updateHeroSlider();
        };

        const startHeroAutoplay = () => {
            heroInterval = setInterval(nextHeroSlide, 1500);
        };

        const resetHeroAutoplay = () => {
            clearInterval(heroInterval);
            startHeroAutoplay();
        };

        // Event Listeners
        heroNext.addEventListener('click', () => {
            nextHeroSlide();
            resetHeroAutoplay();
        });

        heroPrev.addEventListener('click', () => {
            prevHeroSlide();
            resetHeroAutoplay();
        });

        // Start initial autoplay
        startHeroAutoplay();
    }

    // ─── HOMEPAGE PRODUCTS CAROUSEL ───
    const hpCarouselElement = document.getElementById('hp-carousel-track');
    const hpPrevBtn = document.getElementById('hp-prev');
    const hpNextBtn = document.getElementById('hp-next');
    if (hpCarouselElement && hpPrevBtn && hpNextBtn) {
        let hpCurrentSlide = 0;
        const hpSlides = hpCarouselElement.querySelectorAll('.hp-carousel__slide');
        const hpTotalSlides = hpSlides.length;
        let hpAutoPlayInterval;
        const updateHpCarousel = () => {
            hpCarouselElement.style.transform = `translateX(-${hpCurrentSlide * 100}%)`;
        };
        const hpNextSlide = () => {
            hpCurrentSlide = (hpCurrentSlide + 1) % hpTotalSlides;
            updateHpCarousel();
        };
        const hpPrevSlide = () => {
            hpCurrentSlide = (hpCurrentSlide - 1 + hpTotalSlides) % hpTotalSlides;
            updateHpCarousel();
        };
        hpNextBtn.addEventListener('click', () => {
            hpNextSlide();
            resetHpAutoplay();
        });
        hpPrevBtn.addEventListener('click', () => {
            hpPrevSlide();
            resetHpAutoplay();
        });
        const startHpAutoplay = () => {
            hpAutoPlayInterval = setInterval(hpNextSlide, 3500);
        };
        const resetHpAutoplay = () => {
            clearInterval(hpAutoPlayInterval);
            startHpAutoplay();
        };
        startHpAutoplay();
    }

    // ─── TEAM MODAL (ABOUT PAGE) ───
    const teamCards = document.querySelectorAll('.team-card');
    const teamModal = document.getElementById('team-modal');
    if (teamCards.length > 0 && teamModal) {
        const teamModalClose = document.getElementById('team-modal-close');
        const teamModalBackdrop = document.getElementById('team-modal-backdrop');
        const viewImg = document.getElementById('tm-img');
        const viewName = document.getElementById('tm-name');
        const viewRole = document.getElementById('tm-role');
        const viewBio = document.getElementById('tm-bio');
        const viewExp = document.getElementById('tm-exp');
        const viewEmail = document.getElementById('tm-email');

        const closeTeamModal = () => {
            teamModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        const openTeamModal = (card) => {
            const imgSrc = card.querySelector('.team-card__img').src;
            const name = card.querySelector('.team-card__name').textContent;
            const role = card.querySelector('.team-card__role').textContent;
            const fullData = card.querySelector('.team-card__full-data');
            const bio = fullData.querySelector('.bio').innerHTML;
            const exp = fullData.querySelector('.exp').innerHTML;
            const email = fullData.querySelector('.contact').textContent;

            viewImg.src = imgSrc;
            viewName.textContent = name;
            viewRole.textContent = role;
            viewBio.innerHTML = bio;
            viewExp.innerHTML = exp;
            viewEmail.textContent = email;
            viewEmail.href = `mailto:${email}`;

            teamModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        teamCards.forEach(card => {
            card.addEventListener('click', () => openTeamModal(card));
        });

        teamModalClose.addEventListener('click', closeTeamModal);
        teamModalBackdrop.addEventListener('click', closeTeamModal);
    }

});
