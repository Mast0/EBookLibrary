export const patterns = {
  USER: {
    CREATE: { cmd: 'create_user' },
    LOGIN: { cmd: 'login_user' },
    FIND_ALL: { cmd: 'find_all_users' },
    FIND_BY_ID: { cmd: 'find_user_by_id' },
    UPDATE: { cmd: 'update_user' },
    DELETE:  { cmd: 'delete_user' },
    FIND_BY_EMAIL: { cmd: 'find_user_by_email' },
    RESET_PASSWORD: { cmd: 'reset_password' },
    GET_ROLE_BY_EMAIL: { cmd: 'get_user_role' }
  },
  AUTH: {
    TOKENS: { cmd: 'auth.tokens' },
    VERIFY: { cmd: 'auth.verify' },
    REFRESH: { cmd: 'auth.refresh' }
  },
  BOOK: {
    CREATE: { cmd: 'create_book' },
    FIND_ALL: { cmd: 'find_all_books' },
    FIND_BY_ID: { cmd: 'find_book_by_id' },
    UPDATE: { cmd: 'update_book' },
    FIND_BY_TITLE: { cmd: 'find_book_by_title' },
    FIND_BY_AUTHOR: { cmd: 'find_book_by_author' },
    RESET_PASSWORD: { cmd: 'reset_password' },
  },
  READING: {
    CREATE: { cmd: 'create_readings' },
    FIND_ALL: { cmd: 'find_all_readings' },
    UPDATE: { cmd: 'update_reading' }
  },
};