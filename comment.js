let commentsData = [];

export function getComments() {
    return commentsData;
}

export function updateCommentsData(newComments) {
    commentsData = newComments || [];
}