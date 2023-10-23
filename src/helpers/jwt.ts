import jwt from 'jsonwebtoken';

const DEFAULT_OPTIONS = {
    expiresIn: '1h'
}

/**
 * Generates a signed JWT access token.
 * 
 * @param payload - The data to be included in the token.
 * @param options - The options for generating the token (default: DEFAULT_OPTIONS).
 * @returns The signed JWT access token.
 * @throws Error if the secret key is empty.
 */
export const signJwtAccessToken = (payload: any, options = DEFAULT_OPTIONS) => {
    const secretKey: string = process.env.JWT_SECRET_KEY ?? "";

    // Check if the secret key is empty
    if (secretKey === "") {
        throw Error("Secret Key is empty");
    }

    // Generate the token using the payload, secret key, and options
    const token = jwt.sign(payload, secretKey, options);

    return token;
}

export const verifyJwt = (token: any) => {
    try {
        const secretKey: string = process.env.JWT_SECRET_KEY ?? "";
        if (secretKey === "") {
            throw Error("Secret Key is empty")
        }
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    }
    catch (e) {
        console.error(e);
        return null;
    }
}