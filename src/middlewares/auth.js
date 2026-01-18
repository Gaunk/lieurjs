import { sendResponse } from '../utils/response.js';

export async function auth(req, res) {
    const token = req.headers['authorization'];
    if (!token || token !== 'Bearer SECRET_TOKEN') {
        sendResponse(res, 401, { message: 'Unauthorized' });
        return false; // stop chain
    }
    return true; // continue
}
