/**
 * main.js – Flexia Premium NG
 * Premium Grid Layout + Animated Hamburger
 */

document.addEventListener('DOMContentLoaded', function() {

    // ---- LOADING ----
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(function() {
            loadingScreen.style.opacity = '0';
            setTimeout(function() { loadingScreen.style.display = 'none'; }, 500);
        }, 800);
    }

    // ---- ANIMATED HAMBURGER ----
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ---- IoT DASHBOARD ----
    let iotChart = null;
    let iotData = {
        earnings: 52850,
        games: 78,
        team: 92,
        health: 100,
        history: [12000, 18000, 25000, 32000, 42000, 48500, 52850]
    };

    function updateIoTValues() {
        const el = document.getElementById('iotEarnings');
        if (el) el.textContent = '₦' + iotData.earnings.toLocaleString();
        const el2 = document.getElementById('iotGames');
        if (el2) el2.textContent = iotData.games + '%';
        const el3 = document.getElementById('iotTeam');
        if (el3) el3.textContent = iotData.team + '%';
        const el4 = document.getElementById('iotHealth');
        if (el4) el4.textContent = iotData.health + '%';
    }

    function initIoTChart() {
        const ctx = document.getElementById('iotChart');
        if (!ctx) return;
        if (iotChart) iotChart.destroy();

        iotChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Day 1', 'Day 7', 'Day 14', 'Day 17', 'Day 21', 'Day 25', 'Day 30'],
                datasets: [{
                    label: 'Earnings (₦)',
                    data: iotData.history,
                    borderColor: '#06B6D4',
                    backgroundColor: 'rgba(6, 182, 212, 0.04)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#06B6D4',
                    pointRadius: 3,
                    pointBorderColor: 'rgba(6, 182, 212, 0.20)',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#94A3B8',
                            font: { size: 10, family: 'Inter' },
                            boxWidth: 12,
                            padding: 12
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                        ticks: { color: '#64748B', font: { size: 9, family: 'Inter' } }
                    },
                    y: {
                        grid: { color: 'rgba(255,255,255,0.03)', drawBorder: false },
                        ticks: {
                            color: '#64748B',
                            font: { size: 9, family: 'Inter' },
                            callback: function(v) { return '₦' + v.toLocaleString(); }
                        }
                    }
                }
            }
        });
        updateIoTValues();
    }

    function openIoT() {
        const modal = document.getElementById('iotModal');
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(initIoTChart, 150);
    }

    function closeIoT() {
        const modal = document.getElementById('iotModal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    const iotMenuBtn = document.getElementById('iotMenuBtn');
    if (iotMenuBtn) {
        iotMenuBtn.addEventListener('click', function(e) { e.preventDefault();
            openIoT(); });
    }

    const iotFooterBtn = document.getElementById('iotFooterBtn');
    if (iotFooterBtn) {
        iotFooterBtn.addEventListener('click', function(e) { e.preventDefault();
            openIoT(); });
    }

    const iotClose = document.getElementById('iotModalClose');
    if (iotClose) {
        iotClose.addEventListener('click', closeIoT);
    }

    const iotModal = document.getElementById('iotModal');
    if (iotModal) {
        iotModal.addEventListener('click', function(e) {
            if (e.target === this) closeIoT();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('iotModal');
            if (modal && modal.classList.contains('active')) closeIoT();
        }
    });

    // ---- IoT CONTROLS ----
    const refreshBtn = document.getElementById('iotRefresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            iotData.earnings += Math.floor(Math.random() * 350);
            iotData.games = 70 + Math.floor(Math.random() * 28);
            iotData.team = 85 + Math.floor(Math.random() * 14);
            iotData.health = 95 + Math.floor(Math.random() * 5);
            iotData.history.push(iotData.earnings);
            if (iotData.history.length > 7) iotData.history.shift();
            updateIoTValues();
            initIoTChart();
            showNotification('IoT data refreshed', 'success');
        });
    }

    const exportBtn = document.getElementById('iotExport');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showNotification('Report exported successfully', 'success');
        });
    }

    const notifyBtn = document.getElementById('iotNotify');
    if (notifyBtn) {
        notifyBtn.addEventListener('click', function() {
            showNotification('Alerts configured successfully', 'success');
        });
    }

    // ---- NOTIFICATION ----
    function showNotification(message, type) {
        const el = document.createElement('div');
        const bg = type === 'success' ? 'rgba(6, 182, 212, 0.08)' : 'rgba(79, 70, 229, 0.08)';
        const border = type === 'success' ? 'rgba(6, 182, 212, 0.20)' : 'rgba(79, 70, 229, 0.20)';
        el.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bg};
            backdrop-filter: blur(16px);
            border: 1px solid ${border};
            border-radius: 8px;
            padding: 10px 18px;
            color: #F1F5F9;
            font-weight: 500;
            font-size: 0.8rem;
            z-index: 99999;
            box-shadow: 0 8px 32px rgba(0,0,0,0.40);
            animation: slideIn 0.3s ease;
            max-width: 340px;
            font-family: 'Inter', sans-serif;
        `;
        el.textContent = message;
        document.body.appendChild(el);

        setTimeout(function() {
            el.style.opacity = '0';
            el.style.transform = 'translateX(40px)';
            setTimeout(function() { if (el.parentNode) el.remove(); }, 400);
        }, 2800);
    }

    // ---- APK DOWNLOAD ----
    function handleApkDownload(e) {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = './flexia-app.apk';
        link.download = 'Flexia-Premium-App-v2.0.1.apk';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(function() { if (link.parentNode) link.remove(); }, 200);
        showNotification('Downloading Flexia App (1.6MB)', 'success');
    }

    const apkButtons = document.querySelectorAll(
        '#navApkBtn, #heroApkBtn, #mainApkBtn, #ctaApkBtn, #footerApkBtn'
    );
    apkButtons.forEach(function(btn) {
        if (btn) btn.addEventListener('click', handleApkDownload);
    });

    // ---- FAQ ----
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        const q = item.querySelector('.faq-q');
        if (q) {
            q.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                faqItems.forEach(function(other) { other.classList.remove('active'); });
                if (!isActive) item.classList.add('active');
            });
        }
    });

    // ---- BACK TO TOP ----
    const backTop = document.getElementById('backToTop');
    if (backTop) {
        window.addEventListener('scroll', function() {
            backTop.classList.toggle('visible', window.pageYOffset > 300);
        });
        backTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- SMOOTH SCROLL ----
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                if (navLinks && navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
                window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
            }
        });
    });

    // ---- URGENCY ----
    const urgencySpan = document.querySelector('#urgencyNote span');
    if (urgencySpan) {
        let slots = 87;
        setInterval(function() {
            if (slots > 0) {
                slots -= Math.floor(Math.random() * 2);
                if (slots < 0) slots = 0;
                urgencySpan.textContent = 'Only ' + slots + ' premium slots left at ₦8,000';
                if (slots < 10) {
                    const note = document.getElementById('urgencyNote');
                    if (note) note.style.animation = 'pulse 0.8s infinite';
                }
            }
        }, 45000);
    }

    // ---- NAV ACTIVE ----
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        const scrollPos = window.scrollY + 80;
        sections.forEach(function(section) {
            const top = section.offsetTop;
            const height = section.clientHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.id;
            }
        });
        document.querySelectorAll('.nav-link:not(.register-link)').forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ---- VIDEO FALLBACK ----
    const heroVideo = document.querySelector('.hero-video');
    const heroFallback = document.querySelector('.hero-fallback');
    if (heroVideo && heroFallback) {
        heroVideo.addEventListener('error', function() {
            this.style.display = 'none';
            heroFallback.style.display = 'block';
        });
        if (heroVideo.readyState >= 3) {
            heroVideo.play().catch(function() {
                heroVideo.style.display = 'none';
                heroFallback.style.display = 'block';
            });
        }
    }

    // ---- IMAGE ERROR ----
    document.querySelectorAll('img').forEach(function(img) {
        img.addEventListener('error', function() {
            if (this.classList.contains('logo') || this.classList.contains('hero-logo')) {
                this.src = 'images/logo/flexia-logo.png';
            } else if (this.classList.contains('avatar')) {
                const name = this.alt.split(' ')[0] || 'User';
                this.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + encodeURIComponent(name);
            }
        });
    });

    console.log('Flexia Premium NG – Premium Grid + Animated Hamburger ready');

});
