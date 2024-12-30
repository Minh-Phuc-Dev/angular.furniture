export * from "helpers/Request"

export function getImageUrl(image?: string) {
    if (!image) return "/images/no-image.jpg"

    return `http://localhost:8080/api/media/${image}`
}