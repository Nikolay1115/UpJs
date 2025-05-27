const personalKey = "nikolay-skorikov";
const apiUrl = `https://wedev-api.sky.pro/api/v1/${personalKey}/comments`;

export async function fetchCommentsFromAPI() {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Ошибка сервера');
    }
    return await response.json();
}

export async function postCommentToAPI({ name, text }) {
    const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ name, text })
    });
    if (!response.ok) {
        throw new Error('Ошибка сервера');
    }
    return await response.json();
}

export function delay(interval = 300) {
    return new Promise(resolve => setTimeout(resolve, interval));
}