let commentsData = []
let isLoading = false
let isAdding = false
let formData = { name: "", text: "" } // Для сохранения данных формы

export function getComments() {
    return commentsData
}

export function getLoadingState() {
    return { isLoading, isAdding }
}

export function getFormData() {
    return formData
}

export function updateFormData(newData) {
    formData = { ...formData, ...newData }
}

export function updateCommentsData(newComments) {
    commentsData = (newComments || []).map((comment) => ({
        ...comment,
        isLikeLoading: false,
    }))
}

export function setLoading(state) {
    isLoading = state
}

export function setAdding(state) {
    isAdding = state
}

export function updateCommentLike(index, state) {
    if (commentsData[index]) {
        commentsData[index].isLikeLoading = state
    }
}
