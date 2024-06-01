import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Collection from "./pages/Collection";
import CreateCol from "./pages/CreateCol";
import Main from "./pages/Main";
import Picture from "./pages/Picture";
import Upload from "./pages/Upload";
import { ADMIN_ROUTE, COLLECTION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PICTURE_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const routes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: COLLECTION_ROUTE,
        Component: Main
    },
    {
        path: COLLECTION_ROUTE + '/:id',
        Component: Collection
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: PICTURE_ROUTE + '/:id',
        Component: Picture
    },
    {
        path: '/upload',
        Component: Upload
    },
    {
        path: '/createCollection',
        Component: CreateCol
    }
]