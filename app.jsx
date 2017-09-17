var LeaderRow = React.createClass({

	render: function() {
		var leader = this.props.leader;
		return (
			<tr>
				<td>{this.props.counter}</td>
				<td><img src={leader.img}/></td>
				<td>{leader.username}</td>
				<td>{leader.recent}</td>
				<td>{leader.alltime}</td>
			</tr>
		);
	}
});

var LeaderTable = React.createClass({

	render: function() {
		var rows = [];
		var counter = 0;
		this.props.leaders.forEach(function(leader) {
			rows.push(<LeaderRow counter={++counter} leader={leader} />);
		});
		return (
			<table>
				<thead>
					<tr>
						<th>Rank</th>
						<th>&nbsp;</th>
						<th>Camper</th>
						<th>Last 30 Days Points</th>
						<th>Total Points</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
});

var ListChooser = React.createClass({

	handleChange: function(event) {
		this.props.onListChanged(event.target.value);
	},

	render: function() {
		return (
			<form>
				<label>
					<span>List to display:</span>
					<input type="radio" name="list-chooser"
						onChange={this.handleChange} value="recent"
						checked={this.props.listToUse === "recent"} /> Top users for last 30 days
				</label>
				<label>
					<input type="radio" name="list-chooser"
						onChange={this.handleChange} value="allTime"
						checked={this.props.listToUse === "allTime"} /> Top users for all time
				</label>
			</form>
		);
	}
});

var api = {
	recent: "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
	allTime: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime"
}

var LeaderBoard = React.createClass({

	getInitialState: function() {
		return {
			listToUse: "recent",
			leaders: []
		}
	},

	componentDidMount: function(){
		this.getData(this.state.listToUse);
	},

	getData: function(listToUse) {
		$.getJSON(api[listToUse], function(data){
			this.setState({leaders: data});
		}.bind(this))
	},

	handleListChanged: function(listToUse) {
		this.setState({listToUse: listToUse});
		this.getData(listToUse);
	},

	render: function() {
		return (
			<div>
				<h2>FreeCodeCamp Leader Board</h2>
				<ListChooser
					listToUse={this.state.listToUse}
					onListChanged={this.handleListChanged} />
				<LeaderTable
					leaders={this.state.leaders} />
			</div>
		);
	}
});

ReactDOM.render(
	<LeaderBoard />,
	document.body
);
