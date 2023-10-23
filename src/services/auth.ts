/**
 * Registers a user with the given email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - A promise that resolves with the response JSON if successful, otherwise rejects with an error.
 */
export const registerUser = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        // Send a POST request to the '/api/register' endpoint
        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
            .then(res => {
                // Parse the response JSON
                res
                    .json()
                    .then(json => resolve(json))
                    .catch(e => reject(e))
            })
            .catch(e => reject(e))
    })
}