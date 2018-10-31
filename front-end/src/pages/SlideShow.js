import React, { Component } from 'react';
import TheSlideShow from '../components/SlideShow/index.js'
import api from '../api/init'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core/';
import { Link } from 'react-router-dom'

export default class SlideShow extends React.Component {
    state = {
        venues: []
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    async getImages() {
        let responses = await api.get(`/venue`)
        // for (let i = 0; i < 10; i++) {
        //     let randomIndex = this.getRandomInt(responseArrayLength)
        //     let responseImageUrl = responses.data[randomIndex].image
        //     imageArray[i] = { id: i, url: responseImageUrl }
        // }

        this.setState({
            venues: responses.data
        })
        console.log("updated state")
        console.log(this.state.venues)
    }

    async componentDidMount() {
        this.getImages()
    }

    render() {
        // const customColumnStyle = { width: 200 };

        return <>
            {this.state.venues ? (
                <div className="slide">
                    <ListSubheader component="div">Venues</ListSubheader>
                    <GridList cols={5} >
                        <GridListTile key="Subheader" style={{ height: 'auto' }}>
                        </GridListTile>
                        {this.state.venues.map(tile => (
                            <GridListTile key={tile.img}>
                                <img src={tile.image} alt={tile.name} />
                                <GridListTileBar
                                    title={tile.name}
                                    subtitle={<span>{tile.location}</span>}
                                />
                            </GridListTile>
                        ))}
                    </GridList>

                </div>
            ) : (<CircularProgress />)}
        </>
    }
}
