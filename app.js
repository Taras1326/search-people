const axios = require('axios');

// Функція для перевірки номера у витоках
async function checkPhoneInBreaches(phone) {
    console.log(`Перевірка номера: ${phone}`);
    
    // 1. HaveIBeenPwned (потребує API ключ)
    try {
        const hibe = await axios.get(`https://haveibeenpwned.com/api/v3/phone/${phone}`, {
            headers: { 'hibp-api-key': 'ВАШ_API_КЛЮЧ' }
        });
        console.log('Знайдено у витоках (HIBP):', hibe.data);
    } catch(e) {
        console.log('HIBP: не знайдено або помилка');
    }
    
    // 2. Leak-Lookup (потребує API ключ)
    try {
        const leak = await axios.post('https://leak-lookup.com/api/search', {
            key: 'ВАШ_API_КЛЮЧ',
            type: 'phone',
            query: phone
        });
        console.log('Leak-Lookup:', leak.data);
    } catch(e) {
        console.log('Leak-Lookup: помилка');
    }
    
    // 3. Пошук у відкритих соцмережах (без API, просто посилання)
    console.log('\nПеревірте вручну:');
    console.log(`Telegram: https://t.me/${phone}`);
    console.log(`WhatsApp: https://wa.me/${phone.replace('+', '')}`);
    console.log(`Facebook: https://www.facebook.com/search/top?q=${phone}`);
}

// Використання
checkPhoneInBreaches('+7 978772-09013');