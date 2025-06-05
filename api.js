const personalKey = "nikolay-skorikov"
const apiUrl = `https://wedev-api.sky.pro/api/v1/${personalKey}/comments`

export async function fetchCommentsFromAPI() {
    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            if (response.status === 500) {
                throw new Error("Ошибка сервера. Пожалуйста, попробуйте позже.")
            }
            throw new Error("Ошибка при загрузке комментариев")
        }
        return response.json()
    } catch (error) {
        if (
            error.message === "Failed to fetch" ||
            error.message.includes("NetworkError")
        ) {
            throw new Error(
                "Проблемы с интернетом. Проверьте соединение и попробуйте снова.",
            )
        }
        throw error
    }
}

export async function postCommentToAPI({ name, text }) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify({
                name,
                text,
                forceError: Math.random() > 0.5,
            }),
        })

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error(
                    "Имя и комментарий должны быть не короче 3 символов",
                )
            }
            if (response.status === 500) {
                throw new Error("Ошибка сервера. Пожалуйста, попробуйте позже.")
            }
            throw new Error("Ошибка при отправке комментария")
        }
        return response.json()
    } catch (error) {
        if (
            error.message === "Failed to fetch" ||
            error.message.includes("NetworkError")
        ) {
            throw new Error(
                "Проблемы с интернетом. Проверьте соединение и попробуйте снова.",
            )
        }
        throw error
    }
}

export function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(resolve, interval)
    })
}
