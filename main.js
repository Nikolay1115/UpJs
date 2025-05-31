import { fetchCommentsFromAPI } from "./api.js"
import { updateCommentsData, setLoading } from "./comment.js"
import { renderComments } from "./ui.js"
import { setupAddComment } from "./listeners.js"
import { addGlobalStyles } from "./utilits.js"

async function initApp() {
    addGlobalStyles()

    try {
        setLoading(true)
        renderComments()

        const data = await fetchCommentsFromAPI()
        updateCommentsData(data.comments)
    } catch (error) {
        console.error("Ошибка загрузки:", error)
    } finally {
        setLoading(false)
        renderComments()
    }

    setupAddComment(
        document.querySelector(".add-form-name"),
        document.querySelector(".add-form-text"),
        document.querySelector(".add-form-button"),
        document.querySelector(".error-message"),
    )
}

document.addEventListener("DOMContentLoaded", initApp)
