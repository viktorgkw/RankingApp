import React, { useState, useEffect } from 'react';
import RankingGrid from './RankingGrid.js';
import ItemCollection from './ItemCollection.js';

const RankItems = ({ items, setItems, dataType, imgArr, localStorageKey }) => {

    const [unrank, setUnrank] = useState(false);

    function Unrank() {
        setUnrank(true);
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();

        const targetElement = ev.target;

        if (targetElement.nodeName === "IMG") {
            return false;
        }
        if (targetElement.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map(item => (item.id === parseInt(data))
                ? { ...item, ranking: parseInt(targetElement.id.substring(5)) }
                : { ...item, ranking: item.ranking });

            setItems(transformedCollection);
        }
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    useEffect(() => {
        if (items == null) {
            getDataFromApi();
        }
    }, [dataType]);

    function getDataFromApi() {
        fetch(`item/${dataType}`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })
    }

    useEffect(() => {
        if (items != null) {
            localStorage.setItem(localStorageKey, JSON.stringify(items));
        }
        setUnrank(false);
    }, [items]);

    useEffect(() => {
        if (unrank) {
            getDataFromApi();
        }
    }, [unrank]);

    return (
        (items != null)
            ?
            <main>
                <RankingGrid items={items} imgArr={imgArr} drag={drag} allowDrop={allowDrop} drop={drop} />
                <ItemCollection items={items} drag={drag} imgArr={imgArr} />
                <button class="button-19" role="button" onClick={Unrank} style={{ "marginTop": "10px" }}>Unrank Items</button>
            </main>
            :
            <main>Loading...</main>
    )
}

export default RankItems;