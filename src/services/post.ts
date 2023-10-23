export const getAllPosts = async () => {
    return new Promise((resolve, reject) => {
        fetch('/api/post', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        }).then((res) => {
            res.json().then((json) => resolve(json)).catch((err) => reject(err))

        }).catch((err) => reject(err))
    })
}