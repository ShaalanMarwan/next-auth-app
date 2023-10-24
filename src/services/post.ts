/**
 * Retrieves all posts from the API.
 * @param accessToken - The access token for authorization.
 * @returns A promise that resolves to the JSON response of the API call.
 */
export const getAllPosts = (accessToken: string) => {
    return new Promise((resolve, reject) => {
        fetch('/api/post', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": accessToken
            },
        }).then((res) => {
            res.json().then((json) => resolve(json)).catch((err) => reject(err))

        }).catch((err) => reject(err))
    })
}