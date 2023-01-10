const RankingGrid = ({ items, imgArr, drag, allowDrop, drop }) => {

    const rankingGrid = [];
    const cellCollectionInsane = [];
    const cellCollectionGood = [];
    const cellCollectionDecent = [];
    const cellCollectionWorst = [];

    function pushCellMarkupToArray(cellCollection, rankNum, rowLabel) {
        if (rankNum > 0) {
            let item = items.find(i => i.ranking === rankNum);
            cellCollection.push(<div id={`rank-${rankNum}`} onDrop={drop} onDragOver={allowDrop} className="rank-cell">
                {(item == null)
                    ? null
                    : <img id={`item-${item.id}`} src={imgArr.find(i => i.id === item.imageId)?.image} draggable="true" onDragStart={drag} />}
            </div>);
        }
        else {
            cellCollection.push(<div className="row-label">
                <h4>{rowLabel}</h4>
            </div>);
        }
    }

    function createCellsForRow(row) {
        let rankNum = 0;
        let currentCollection = [];
        let label = "";
        const cellsCount = 5;

        for (let a = 1; a <= cellsCount; a++) {
            rankNum = (a === 1) ? 0 : (cellsCount * (row - 1)) + a - row;

            if (row === 1) {
                currentCollection = cellCollectionInsane;
                label = "Insane";
            }
            else if (row === 2) {
                currentCollection = cellCollectionGood;
                label = "Good";
            }
            else if (row === 3) {
                currentCollection = cellCollectionDecent;
                label = "Decent";
            }
            else if (row === 4) {
                currentCollection = cellCollectionWorst;
                label = "Worst";
            }

            pushCellMarkupToArray(currentCollection, rankNum, label);
        }
    }

    function createCellsForRows() {
        const rowsCount = 4;

        for (let row = 1; row <= rowsCount; row++) {
            createCellsForRow(row);
        }
    }

    function createRowsForGrid() {
        rankingGrid.push(<div className="rank-row insane-tier">{cellCollectionInsane}</div>);
        rankingGrid.push(<div className="rank-row good-tier">{cellCollectionGood}</div>);
        rankingGrid.push(<div className="rank-row decent-tier">{cellCollectionDecent}</div>);
        rankingGrid.push(<div className="rank-row worst-tier">{cellCollectionWorst}</div>);

        return rankingGrid;
    }

    function createRankingGrid() {
        createCellsForRows();

        return createRowsForGrid();
    }

    return (
        <div className="rankings">
            {createRankingGrid()}
        </div>
    );
}

export default RankingGrid;