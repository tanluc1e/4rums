import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

/**
 * Tạo access token cho người dùng.
 * @param {Object} user - Đối tượng user chứa thông tin cần thiết để tạo token.
 * @returns {Promise<string>} - Promise trả về chuỗi access token nếu thành công.
 */
const signAccessToken = (user) => {
    return new Promise((resolve, reject) => {

        /** Tạo payload cho token từ thông tin của user */
        const payload = {
            id: user.id,
            name: user.name,
            displayName: user.displayName,
            picture: user.picture,
            role: user.role
        }

        /** Sử dụng JWT để ký và tạo token với payload đã tạo */
        jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err) {

                /** Gửi lỗi, (từ chối) reject Promise với lỗi là 500 nếu có lỗi trong quá trình tạo token */
                console.log(err.message)
                return reject(createHttpError.InternalServerError())
            }

            /** Nếu không có lỗi, (giải quyết) resolve Promise và trả về token đã tạo */
            return resolve(token)
        })
    })
};

/**
 * Middleware để xác minh tính hợp lệ của access token.
 * @param {Object} req - Đối tượng request.
 * @param {Object} res - Đối tượng response.
 * @param {Function} next - Callback function tiếp theo trong chuỗi middleware.
 */
const verifyAccessToken = (req, res, next) => {

    /** Kiểm tra xem header 'Authorization' có tồn tại không */
    if (!req.headers['authorization']) {

        /** Nếu không tồn tại, trả về lỗi 401 Unauthorized thông qua middleware tiếp theo */
        return next(createHttpError.Unauthorized())
    }

    /** Lấy thông tin từ header 'Authorization' và tách token từ chuỗi 'Bearer <token>' */
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]

    /** Xác minh tính hợp lệ của access token sử dụng secret key từ biến môi trường */
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if (err) {

            /** Nếu có lỗi trong quá trình xác minh, trả về lỗi 401 Unauthorized */
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
            return next(createHttpError.Unauthorized(message))
        }

        /** Nếu access token hợp lệ, lưu payload vào req và chuyển giao cho middleware tiếp theo */
        req.payload = payload
        next()
    })
};

export { signAccessToken, verifyAccessToken };
