import React from 'react';
// import './SlideShow.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/styles';
import IconButton from '@material-ui/core/styles';
import InfoIcon from '@material-ui/core/styles';
import tileData from '@material-ui/core/styles';

import { Link } from 'react-router-dom'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

export default class Slide extends React.Component {
    // constructor() {
    //     this.routeChange = this.routeChange.bind(this);

    // }

    // routeChange() {
    //     let path = `/Login`
    //     this.props.history.push(path)
    // }

    render() {
        let url = this.props.url;

        let tileData = [
            {
                img: url,
                title: 'Image',
                author: 'author'
            }
        ];
        return (
            <div className="slide">
                {/* <Link to={`/venue/${venue._id}`}></Link> */}
                {/* <Link to={`/event/${event._id}`}></Link> */}
                {/* onClick={() => this.handleChangeEvent()} */}

                <GridList cellHeight={180} className={Slide.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">December</ListSubheader>
                    </GridListTile>
                    {tileData.map(tile => (
                        <GridListTile key={tile.img}>
                            <img src={tile.img} alt={tile.title} />
                            <GridListTileBar
                                title={tile.title}
                                subtitle={<span>by: {tile.author}</span>}
                                actionIcon={
                                    <IconButton className={Slide.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>

                {/* <img src={url} /> */}

            </div>
        );
    }
}