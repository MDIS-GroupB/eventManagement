import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/styles';
import GridListTileBar from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/styles';
import IconButton from '@material-ui/core/styles';
import InfoIcon from '@material-ui/core/styles';
import tileData from '@material-ui/core/styles';


export default class SlideRefactor extends React.Component {
    render()
    //render() is like the main() function
    {

        return (
            <div className="slide">
                {/* <Link to={`/venue/${venue._id}`}></Link> */}
                {/* <Link to={`/event/${event._id}`}></Link> */}
                {/* onClick={() => this.handleChangeEvent()} */}

                <GridList cellHeight={180} className={SlideRefactor.gridList}>
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
                                    <IconButton className={SlideRefactor.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>

                {/* <img src={url} /> */}

            </div>
        )
        //like main() function , render() also have some return value
    }
}