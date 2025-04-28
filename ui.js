import { getComments } from "./comment.js"
import {
    attachLikeHandlers,
    attachCommentHandlers,
    setupAddComment,
} from "./listeners.js"

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
                    <div>${comment.name}</div>
                    <div>${comment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">
                        ${comment.text}
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

export function setup() {
    setupAddComment(nameInput, commentInput, addButton, errorMessage)
}
;``
