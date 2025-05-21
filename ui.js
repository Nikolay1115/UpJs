import { toggleLike, getComments, commentsData, fetchComments as fetchCommentsFromAPI, postComment } from "./comment.js";

export async function fetchComments() {
    await fetchCommentsFromAPI(); 
    renderComments(); 
}

export function renderComments() {
    const commentsList = document.querySelector(".comments");
    commentsList.innerHTML = "";

    const comments = getComments();
    comments.forEach((comment, index) => {
        const commentItem = document.createElement("li");
        commentItem.classList.add("comment");
        commentItem.setAttribute("data-index", index);
        commentItem.innerHTML = `
            <div class="comment-header">
                <div>${comment.author.name}</div>
                <div>${new Date(comment.date).toLocaleString()}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">${comment.text}</div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
                </div>
            </div>
        `;
        commentsList.appendChild(commentItem);
    });

    attachLikeHandlers();
}

export function setup() {
    const nameInput = document.querySelector(".add-form-name");
    const commentInput = document.querySelector(".add-form-text");
    const addButton = document.querySelector(".add-form-button");
    const errorMessage = document.querySelector(".error-message");

    setupAddComment(nameInput, commentInput, addButton, errorMessage);
}

export function attachLikeHandlers() {
    const likeButtons = document.querySelectorAll(".like-button");
    likeButtons.forEach((button, index) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleLike(index);
            renderComments();
        });
    });
}

export function setupAddComment(nameInput, commentInput, addButton, errorMessage) {
    addButton.addEventListener("click", async () => {
        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        if (!name || !comment) {
            errorMessage.textContent = "Пожалуйста, заполните все поля.";
            errorMessage.style.display = "block";
            return;
        } else {
            errorMessage.style.display = "none";
        }

        const result = await postComment(name, comment);
        if (result) {
            nameInput.value = "";
            commentInput.value = "";
            await fetchComments();
            renderComments();
        } else {
            errorMessage.textContent = "Ошибка при добавлении комментария.";
            errorMessage.style.display = "block";
        }
    });
}
