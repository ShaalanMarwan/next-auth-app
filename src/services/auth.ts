
export const registerUser = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        fetch("/api/register", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "Accept": "application/json",
            }

        }).then((res) => {
            res.json().then((json) => resolve(json)).catch(e => reject(e))
        }).catch(e => reject(e))
    })
}