const personalKey = "nikolai-skorikov"; 
const apiUrl = `https://wedev-api.sky.pro/api/v1/${personalKey}/comments`;

let commentsData = [];

export async function fetchComments() {
    const response = await fetch(apiUrl);
    if (response.ok) {
        const data = await response.json();
        commentsData = data.comments.map(comment => ({
            author: { name: comment.author.name },
            text: comment.text,
            date: comment.date,
            likes: comment.likes,
            isLiked: comment.isLiked,
        }));
    }
}

export async function postComment(name, text) {
    const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ name, text }),
    });

    if (response.ok) {
        return true; 
    } else {
        const errorData = await response.json();
        console.error("Ошибка при добавлении комментария:", errorData);
        return false; 
    }
}

export function getComments() {
    return commentsData;
}

export function toggleLike(index) {
    commentsData[index].isLiked = !commentsData[index].isLiked;
    commentsData[index].likes += commentsData[index].isLiked ? 1 : -1;
}

// Экспортируем commentsData
export { commentsData };
