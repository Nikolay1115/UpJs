import { getComments } from "./comment.js";
import { toggleLike, setupQuote } from "./listeners.js";
import { escapeHtml } from "./utilits.js";

export function renderComments() {
    const commentsList = document.querySelector(".comments");
    if (!commentsList) return;

    commentsList.innerHTML = "";
    const comments = getComments();

    comments.forEach((comment, index) => {
        const commentItem = document.createElement("li");
        commentItem.className = "comment";
        commentItem.dataset.index = index;
        
        commentItem.innerHTML = `
            <div class="comment-header">
                <div>${escapeHtml(comment.author.name)}</div>
                <div>${new Date(comment.date).toLocaleString()}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">${escapeHtml(comment.text)}</div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
                </div>
            </div>
        `;

        commentItem.querySelector('.comment-text').addEventListener('click', () => {
            setupQuote(comment);
        });

        commentItem.querySelector('.like-button').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLike(index);
            renderComments();
        });

        commentsList.appendChild(commentItem);
    });
}