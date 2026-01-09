(function () {

    // Inject styles
    const style = document.createElement("style");
    style.textContent = `
        .lang-switcher {
        display: inline-block;
        margin-top: 1.5em;
        margin-bottom: 1.5em;
        }

        .lang-dropdown {
        position: relative;
        display: inline-block;
        }

        .lang-option {
        color: black !important;
        }

        .lang-btn {
        background: none;
        border: 1px solid rgba(255, 255, 255, 0.5);
        color: white;
        /* padding: 8px 15px; */
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        }

        .lang-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        }

        .lang-btn img {
        width: 20px;
        margin-right: 8px;
        }

        .lang-dropdown-content {
        display: none;
        position: absolute;
        background: white;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        border-radius: 4px;
        overflow: hidden;
        padding: .5em;
        width: 8em;
        }

        .lang-dropdown-content a {
        color: #333;
        padding: 10px 15px;
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: background 0.3s ease;
        }

        .lang-dropdown-content a:hover {
        background: #f5f5f5;
        }

        .lang-dropdown-content a img {
        width: 20px;
        margin-right: 10px;
        }

        .lang-dropdown:hover .lang-dropdown-content {
        display: block;
        }

        html[dir="rtl"] .lang-btn {
        margin-right: 20px;
        margin-left: 0;
        }

        html[dir="rtl"] .lang-btn img {
        margin-right: 0;
        margin-left: 8px;
        }
    `;
    document.head.appendChild(style);

    // Create button
    const language_menu_li = document.createElement("li");

    language_menu_li.innerHTML = `
            <li class="lang-switcher">
                <div class="lang-dropdown">
                    <button class="lang-btn" id="current-lang-btn">
                    <img src="https://flagcdn.com/w20/gb.png" id="current-flag" alt="English">
                    <span id="current-lang">EN</span>
                    </button>
                    <div class="lang-dropdown-content">
                    <a href="#" class="lang-option" data-lang="en">
                        <img src="https://flagcdn.com/w20/gb.png" alt="English"> English
                    </a>
                    <a href="#" class="lang-option" data-lang="ar">
                        <img src="https://flagcdn.com/w20/sa.png" alt="العربية"> العربية
                    </a>
                    </div>
                </div>
            </li>
        `;

    // Append to existing menu
    const menu = document.getElementById("top_menu");
    if (menu) {
        menu.prepend(language_menu_li);
    }

})()

const domReady = new Promise(resolve => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
    } else {
        resolve();
    }
});

domReady.then(() => {
    // Core translation function
    function loadLanguage(lang) {
        // 1. Set HTML language and direction attributes
        document.documentElement.setAttribute('lang', lang);
        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.body.classList.add('rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.body.classList.remove('rtl');
        }

        // 2. Update all elements with data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // 3. Update data-i18n-placeholder attributes
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.setAttribute('placeholder', translations[lang][key]);
            }
        });

        // 4. Update the language switcher UI
        const currentFlag = document.getElementById('current-flag');
        const currentLangText = document.getElementById('current-lang');
        const currentLangBtn = document.getElementById('current-lang-btn');

        if (lang === 'ar') {
            currentFlag.src = 'https://flagcdn.com/w20/sa.png';
            currentFlag.alt = 'العربية';
            currentLangText.textContent = 'AR';
            if (currentLangBtn) {
                currentLangBtn.querySelector('span').textContent = 'AR';
            }
        } else {
            currentFlag.src = 'https://flagcdn.com/w20/gb.png';
            currentFlag.alt = 'English';
            currentLangText.textContent = 'EN';
            if (currentLangBtn) {
                currentLangBtn.querySelector('span').textContent = 'EN';
            }
        }

        // 5. Save preference to localStorage
        setCookie('preferred-language', lang, 30);
    }

    // Initialize language on page load
    document.addEventListener('DOMContentLoaded', function () {
        // Check for saved preference in cookie
        const savedLang = getCookie('preferred-language');

        // If no cookie exists, check browser language
        const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';

        const defaultLang = savedLang || browserLang;

        loadLanguage(defaultLang);

        // Set up click handlers for language switcher options
        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', function (e) {
                e.preventDefault();
                const selectedLang = this.getAttribute('data-lang');
                loadLanguage(selectedLang);
            });
        });
    });

});


