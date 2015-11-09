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

    var over = this.state.board.won() || this.state.board.lost();

    this.setState({
        over: over,
        won: this.state.board.won(),
        test: "testing"
      });
  },

  resetGame: function() {
    this.setState({
      board:  new Minesweeper.Board(10, 10),
      over: false,
      won: false
    })
  },

  render: function() {
    return(
      <div>
        < Modal won={this.state.board.won()} lost={this.state.board.lost()} gameOverCallback={this.resetGame}/>
        < Board updateGame={ this.updateGame }  board={ this.state.board } />
      </div>
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

var Modal = React.createClass({

  generateClassName: function(){

    if (this.props.won || this.props.lost) {
      return "modal-screen show";
    } else {
      return "modal-screen";
    }
  },

  generateMessage: function(){
    if (this.props.won){
      return "YOU WIN!!!!!!!!!!!!!!"
    } else if (this.props.lost){
      return "YOU LOSE"
    }
    return "HOW DID YOU FIND THIS????"
  },

  buttonHandler: function(e) {
    this.props.gameOverCallback();
  },


  render: function(){
    return (
      <div className={this.generateClassName()}>
        <div className="modal-content">
          {this.generateMessage()}
          <button className="new-game-button" onClick={ this.buttonHandler }>New Game</button>
        </div>
      </div>
    )}
});
