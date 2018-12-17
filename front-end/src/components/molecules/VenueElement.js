import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Info from 'material-ui/svg-icons/action/info';
import Create from 'material-ui/svg-icons/content/create';
import { Link, BrowserRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';



export default class myThing extends React.Component {
    state = {

    }

    async componentDidMount() {

    }



    render() {
        console.log("the ppassed props " + JSON.stringify(this.props.row.eventData))
        return (
            <>
                <GridListTile style={{ marginTop: 20 }} >

                    <img src={this.props.row.image} alt={this.props.row.name} width="100%" />
                    <GridListTileBar
                        title={<span style={{ marginLeft: 80 }}>{this.props.row.name}</span>}
                        subtitle={<span style={{ marginLeft: 80 }}>{this.props.row.location}</span>}
                        actionIcon={
                            <>
                                <Link to={`/Venue/${this.props.row._id}`}>
                                    <IconButton style={{ right: 610 }}>
                                        <Info className={this.props.classes.title} style={{ color: 'white' }} />
                                    </IconButton>
                                </Link>
                                <IconButton onClick={this.props.onHandleCreateEvent}>
                                    <Create className={this.props.classes.title} style={{ color: 'white' }} />
                                </IconButton>
                            </>
                        }
                    />

                </GridListTile>
            </>
        )
    }
}