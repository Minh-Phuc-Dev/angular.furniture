export * from "helpers/Request"

export const getImageUrl = (url: string | undefined) => `http://localhost:8080/api/media/${url}`