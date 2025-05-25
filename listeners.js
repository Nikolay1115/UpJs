import { postCommentToAPI, fetchCommentsFromAPI } from "./api.js";
import { updateCommentsData, getComments } from "./comment.js";
import { renderComments } from "./ui.js";

export function setupAddComment(nameInput, commentInput, addButton, errorMessage) {
    addButton.addEventListener("click", async () => {
        try {
            await postCommentToAPI(nameInput.value.trim(), commentInput.value.trim());
            const data = await fetchCommentsFromAPI();
            updateCommentsData(data.comments);
            renderComments();
            nameInput.value = "";
            commentInput.value = "";
            errorMessage.style.display = "none";
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = "block";
        }
    });
}

export function toggleLike(index) {
    const comments = getComments();
    comments[index].isLiked = !comments[index].isLiked;
    comments[index].likes += comments[index].isLiked ? 1 : -1;
}

export function setupQuote(comment) {
    const nameInput = document.querySelector(".add-form-name");
    const commentInput = document.querySelector(".add-form-text");
    nameInput.value = comment.author.name;
    commentInput.value = `> ${comment.text}\n\n`;
    commentInput.focus();
}