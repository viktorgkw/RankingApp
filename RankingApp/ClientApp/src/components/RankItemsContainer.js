import { useState } from 'react';
import RankItems from './RankItems';

const RankItemContainer = ({ dataType, imgArr }) => {
    const albumsLocalStorageKey = "albums";
    const moviesLocalStorageKey = "movies";

    let localStorageKey = "";

    const [albumItems, setAlbumItems] = useState(JSON.parse(localStorage.getItem(albumsLocalStorageKey)));
    const [movieItems, setMovieItems] = useState(JSON.parse(localStorage.getItem(moviesLocalStorageKey)));

    let data = [];
    let setFunc = null;

    if (dataType === 1) {
        data = movieItems;
        setFunc = setMovieItems;
        localStorageKey = moviesLocalStorageKey;
    }
    else if (dataType === 2) {
        data = albumItems;
        setFunc = setAlbumItems;
        localStorageKey = albumsLocalStorageKey;
    }

    return (
        <RankItems
            items={data}
            setItems={setFunc}
            dataType={dataType}
            imgArr={imgArr}
            localStorageKey={localStorageKey} />
    )
}

export default RankItemContainer;