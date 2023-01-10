import React, { useState, useEffect } from 'react';
import MovieImageArr from './MovieImages.js'
import RankingGrid from './RankingGrid.js';
import ItemCollection from './ItemCollection.js';

const RankItems = () => {
    const [items, setItems] = useState([]);
    const dataType = 1;

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
        fetch(`item/${dataType}`)
            .then(results => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })
    }, []);

    return (
        (items != null) ?
            <main>
                <RankingGrid items={items} imgArr={MovieImageArr} drag={drag} allowDrop={allowDrop} drop={drop} />
                <ItemCollection items={items} drag={drag} imgArr={MovieImageArr} />
            </main>
            : <main>Loading...</main>
    )
}

export default RankItems;