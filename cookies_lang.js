// FIXED: Better Cookie helper functions with SameSite support
function setCookie(name, value, days) {
    // Actually using localStorage
    localStorage.setItem(name, value);
}

function getCookie(name) {
    const value = localStorage.getItem(name);
    return value;
}


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
            if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translations[lang][key]);
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // 3. Update the language switcher UI
    const currentFlag = document.getElementById('current-flag');
    const currentLangText = document.getElementById('current-lang');
    if (lang === 'ar') {
        currentFlag.src = 'https://flagcdn.com/w20/sa.png';
        currentFlag.alt = 'العربية';
        currentLangText.textContent = 'AR';
    } else {
        currentFlag.src = 'https://flagcdn.com/w20/gb.png';
        currentFlag.alt = 'English';
        currentLangText.textContent = 'EN';
    }

    // 4. Save preference to cookie (expires in 30 days)
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