import { environment } from "../../environments/environment";

export const BACKEND_DOMAIN = environment.BACKEND_DOMAIN;

export const USER_API = {
    AUTH:`${BACKEND_DOMAIN}/api/user/auth`,
    ARTICLE:`${BACKEND_DOMAIN}/api/user/article`,
}