var MSBoard = React.createClass({

  getInitialState: function() {
    return {
      board: new Minesweeper.Board(10, 10),
      over: false,
      won: false
    };
  },

  updateGame: function() {
    //update the game somehow
  },

  render: function() {
    return(
      < Board updateGame={ this.updateGame }  board={ this.state.board } />
    );
  }

});

var Board = React.createClass({
  mapTiles: function(){
    return this.props.board.grid.map(function(row,i) {
        var rowTiles = row.map(function(item, j){
          return <Tile tile={item} updateGame={this.updateGame} key={[i, j]}/>
      })

      return (
        <div>
        {rowTiles}
        </div>
    )})
  },

  render: function(){
    return(
      <div>
        {this.mapTiles()}
      </div>
    )
  }
});

var Tile = React.createClass({
  generateOutput: function(){
    var tile = this.props.tile
    if (tile.flagged){
      return "⚑";
    } else if (!tile.revealed){
      return "";
    } else if (tile.bombed){
      return "💣";
    } else {
      return tile.adjacentBombCount;
    }
  },

  generateClassName: function(){
    var tile = this.props.tile
    if (tile.flagged){
      return "tile flagged"
    } else if (!tile.revealed){
      return "tile X"
    } else if (tile.bombed){
      return "tile bombed"
    } else {
      return "tile revealed"
    }
  },

  render: function() {
    return(
      <div className={this.generateClassName()}> {this.generateOutput()}</div>
    )
  }
});
