import { postCommentToAPI, fetchCommentsFromAPI, delay } from "./api.js"
import {
    updateCommentsData,
    setLoading,
    setAdding,
    updateCommentLike,
    getComments,
} from "./comment.js"
import { renderComments, updateFormState } from "./ui.js"

export function setupAddComment(
    nameInput,
    commentInput,
    addButton,
    errorMessage,
) {
    addButton.addEventListener("click", async () => {
        const name = nameInput.value.trim()
        const text = commentInput.value.trim()

        if (!name || !text) {
            errorMessage.textContent = "Пожалуйста, заполните все поля"
            errorMessage.style.display = "block"
            return
        }

        try {
            setAdding(true)
            updateFormState(true)

            await postCommentToAPI({ name, text })
            setLoading(true)
            renderComments()

            const data = await fetchCommentsFromAPI()
            updateCommentsData(data.comments)

            nameInput.value = ""
            commentInput.value = ""
            errorMessage.style.display = "none"
        } catch (error) {
            errorMessage.textContent = error.message
            errorMessage.style.display = "block"
        } finally {
            setLoading(false)
            setAdding(false)
            updateFormState(false)
            renderComments()
        }
    })
}

export function toggleLike(index) {
    const comments = getComments()
    if (!comments[index]) return

    updateCommentLike(index, true)
    renderComments()

    delay(1000).then(() => {
        comments[index].isLiked = !comments[index].isLiked
        comments[index].likes += comments[index].isLiked ? 1 : -1
        updateCommentLike(index, false)
        renderComments()
    })
}

export function setupQuote(comment) {
    const commentInput = document.querySelector(".add-form-text")
    if (commentInput) {
        commentInput.value = `> ${comment.text}\n\n`
        commentInput.focus()
    }
}
