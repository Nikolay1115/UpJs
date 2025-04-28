const commentsData = [
    {
        name: "Глеб Фокин",
        text: "Это будет первый комментарий на этой странице",
        date: "12.02.22 12:18",
        likes: 3,
        liked: false,
    },
    {
        name: "Варвара Н.",
        text: "Мне нравится как оформлена эта страница! ❤",
        date: "13.02.22 19:22",
        likes: 75,
        liked: true,
    },
]

export function getComments() {
    return commentsData
}

export function toggleLike(index) {
    commentsData[index].liked = !commentsData[index].liked
    commentsData[index].likes += commentsData[index].liked ? 1 : -1
}
export { commentsData };
