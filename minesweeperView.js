var MSBoard = React.createClass({

  getInitialState: function() {
    window.board = new Minesweeper.Board(10, 10);
    return {
      board: window.board,
      over: false,
      won: false
    };
  },

  updateGame: function(tile, flagged) {
    if(flagged){
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.setState({
        over: this.state.board.lost(),
        won: this.state.board.won(),
        test: "testing"
      });
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
          return <Tile tile={item} updateGame={this.props.updateGame} key={[i, j]}/>
      }.bind(this))

      return (
        <div>
        {rowTiles}
        </div>
    )}.bind(this))
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
    } else if (tile.bombed && tile.explored){
      return "💣";
    } else if (tile.explored) {
      var value = (tile.adjacentBombCount() === 0) ? "" : tile.adjacentBombCount();
      return value;
    }
  },

  generateClassName: function(){
    var tile = this.props.tile
    if (tile.flagged){
      return "tile flagged"
    } else if (tile.explored && tile.bombed){
      return "tile bombed"
    } else if (tile.explored){
      return "tile revealed"
    } else {
      return "tile"
    }
  },

  handleClick: function(e){
    this.props.updateGame(this.props.tile, e.altKey)
  },

  render: function() {
    return(
      <div onClick={this.handleClick} className={this.generateClassName()}>{this.generateOutput()}</div>
    )
  }
});
