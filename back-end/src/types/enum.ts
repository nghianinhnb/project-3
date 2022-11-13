export enum RESULT {
    fail = 'fail',
    success = 'success',
}


export enum ERROR_VI {
    UNAUTHORIZED = 'Chưa đăng nhập',
    PERMISISON_DENIED  = 'Không đủ quyền thực hiện chức năng này',
    MISSING_PARAMETERS = 'Không đủ tham số',
    INTERNAL_ERROR = 'Lỗi máy chủ',
    NOT_FOUND = 'Không tìm thấy thông tin',
    WRONG_PASSWORD = 'Sai tên đăng nhập hoặc mật khẩu',
    INVALID_STATE = 'Trạng thái không hợp lệ',
    NOT_VALID_PARAMETERS = 'Tham số không hợp lệ',
    ACCOUNT_EXISTS = 'Tài khoản đã tồn tại',
    WRONG_OLD_PASSWORD = 'Nhập sai mật khẩu hiện tại',
    INVALID_EMAIL = 'Email không hợp lệ',
    SERVICE_UNAVAILABLE = 'Server đang bận',
    INVALID_PASSWORD = 'Email không hợp lệ',
    TOO_MANY_REQUESTS = 'Quá nhiều yêu cầu liên tục. Hãy thử lại sau ít phút'
}


export enum USER_ROLE {
    ADMINISTRATOR = 0,
    MODERATOR = 1,
    USER = 2
}
