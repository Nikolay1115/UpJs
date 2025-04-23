"use strict"

import { getComments, toggleLike, addComment } from "./comment.js"
import { escapeHtml } from "./utilits.js"
import { attachLikeHandlers, attachCommentHandlers } from "./listeners.js"

const nameInput = document.querySelector(".add-form-name")
const commentInput = document.querySelector(".add-form-text")
const addButton = document.querySelector(".add-form-button")
const commentsList = document.querySelector(".comments")
const errorMessage = document.querySelector(".error-message")

export function renderComments() {
    const commentsData = getComments()
    commentsList.innerHTML = commentsData
        .map(
            (comment, index) => `
            <li class="comment" data-index="${index}">
                <div class="comment-header">
                    <div>${escapeHtml(comment.name)}</div>
                    <div>${comment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">
                        ${escapeHtml(comment.text)}
                    </div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button class="like-button ${comment.liked ? "-active-like" : ""}"></button>
                    </div>
                </div>
            </li>
        `,
        )
        .join("")
    attachLikeHandlers()
    attachCommentHandlers(nameInput, commentInput)
}

export function setupAddComment() {
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

        addComment(escapeHtml(name), escapeHtml(comment), currentDate)
        renderComments()

        nameInput.value = ""
        commentInput.value = ""
    })
}
