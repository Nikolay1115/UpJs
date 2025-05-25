import { fetchCommentsFromAPI } from "./api.js";
import { updateCommentsData } from "./comment.js";
import { renderComments } from "./ui.js";
import { setupAddComment } from "./listeners.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await fetchCommentsFromAPI();
        updateCommentsData(data.comments);
        renderComments();
    } catch (error) {
        console.error("Ошибка загрузки:", error);
    }

    setupAddComment(
        document.querySelector(".add-form-name"),
        document.querySelector(".add-form-text"),
        document.querySelector(".add-form-button"),
        document.querySelector(".error-message")
    );
});

