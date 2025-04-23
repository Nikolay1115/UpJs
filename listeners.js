"use strict"
import { toggleLike, getComments } from "./comment.js"
import { escapeHtml } from "./utilits.js"
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
            nameInput.value = escapeHtml(comment.name)
            commentInput.value = `> ${escapeHtml(comment.text)}`
        })
    })
}
