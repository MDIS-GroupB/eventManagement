import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Info from 'material-ui/svg-icons/action/info';
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
                <GridListTile style={{ margin: '1px', maxWidth: '33%' }}>

                    <img src={this.props.row.image} alt={this.props.row.name} />
                    <GridListTileBar
                        title={<span>{this.props.row.name}</span>}
                        subtitle={<span>{this.props.row.location}</span>}
                        actionIcon={
                            <div style={{ display: 'flex', flexDirection: 'row', marginRight: '10px' }}>
                                <Link to={`/Venue/${this.props.row._id}`}>
                                    <IconButton style={{ right: 495 }}>
                                        <Info style={{ color: 'white' }} />
                                    </IconButton>
                                </Link>
                                {this.props.children}
                            </div>
                        }
                    />

                </GridListTile>
            </>
        )
    }
}