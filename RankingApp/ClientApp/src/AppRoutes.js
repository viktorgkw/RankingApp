import { Home } from "./components/Home";
import RankItemsContainer from "./components/RankItemsContainer";
import MovieImagesArr from "./components/MovieImages.js";
import AlbumImagesArr from "./components/AlbumImages.js";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/rank-movies',
        element: <RankItemsContainer dataType={1} imgArr={MovieImagesArr} />
    },
    {
        path: '/rank-albums',
        element: <RankItemsContainer dataType={2} imgArr={AlbumImagesArr} />
    }
];

export default AppRoutes;