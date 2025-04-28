import { toggleLike, getComments, addComment } from "./comment.js"
import { renderComments } from "./ui.js"

export function attachLikeHandlers() {
    const likeButtons = document.querySelectorAll(".like-button")
    likeButtons.forEach((button, index) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation()
            toggleLike(index)
            renderComments()
        })
    })
}

export function attachCommentHandlers(nameInput, commentInput) {
    const commentItems = document.querySelectorAll(".comment")
    commentItems.forEach((commentItem) => {
        commentItem.addEventListener("click", () => {
            const index = commentItem.getAttribute("data-index")
            const comment = getComments()[index]
            nameInput.value = comment.name
            commentInput.value = `> ${comment.text}`
        })
    })
}

export function setupAddComment(
    nameInput,
    commentInput,
    addButton,
    errorMessage,
) {
    addButton.addEventListener("click", () => {
        const name = nameInput.value.trim()
        const comment = commentInput.value.trim()
        const currentDate = new Date().toLocaleString()

        if (!name || !comment) {
            errorMessage.textContent = "Пожалуйста, заполните все поля."
            errorMessage.style.display = "block"
            return
        } else {
            errorMessage.style.display = "none"
        }

        addComment(name, comment, currentDate)
        renderComments()

        nameInput.value = ""
        commentInput.value = ""
    })
}
