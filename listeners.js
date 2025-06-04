import { postCommentToAPI, fetchCommentsFromAPI, delay } from "./api.js"
import {
    updateCommentsData,
    setLoading,
    setAdding,
    updateCommentLike,
    getComments,
    getFormData,
    updateFormData,
} from "./comment.js"
import { renderComments, updateFormState } from "./ui.js"

export function setupAddComment(
    nameInput,
    commentInput,
    addButton,
    errorMessage,
) {
    // Сохраняем данные формы при вводе
    nameInput.addEventListener("input", () => {
        updateFormData({ name: nameInput.value })
    })

    commentInput.addEventListener("input", () => {
        updateFormData({ text: commentInput.value })
    })

    addButton.addEventListener("click", async () => {
        const name = nameInput.value.trim()
        const text = commentInput.value.trim()

        if (name.length < 3 || text.length < 3) {
            errorMessage.textContent =
                "Имя и комментарий должны быть не короче 3 символов"
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

            // Очищаем форму только при успешной отправке
            nameInput.value = ""
            commentInput.value = ""
            updateFormData({ name: "", text: "" })
            errorMessage.style.display = "none"
        } catch (error) {
            alert(error.message) // Показываем alert с ошибкой
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
        updateFormData({ text: commentInput.value })
        commentInput.focus()
    }
}
