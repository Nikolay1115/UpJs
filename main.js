import { renderComments, setup, fetchComments } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
    await fetchComments(); 
    renderComments();
    setup();
});


