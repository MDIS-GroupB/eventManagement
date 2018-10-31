import React, { Component } from 'react';
import TheSlideShow from '../components/SlideShow/index.js'
import api from '../api/init'

export default class SlideShow extends React.Component {
    state = {
        images: [
            // { id: 1, url: "https://loremflickrxx.com/300/300/dog" },
            // { id: 2, url: "https://loremflickr.com/300/300/cat" },
            // { id: 3, url: "https://loremflickr.com/300/300/cat" },
            // { id: 4, url: "https://loremflickr.com/300/300?random=1" },
            // { id: 5, url: "https://loremflickr.com/300/300?random=2" },
            // { id: 6, url: "https://loremflickr.com/300/300?random=1" },
            // { id: 7, url: "https://loremflickr.com/300/300?random=1" },
            // { id: 8, url: "https://loremflickr.com/300/300?random=1" },
            // { id: 9, url: "https://loremflickr.com/300/300?random=1" },
            // { id: 10, url: "https://loremflickr.com/300/300?random=1" }
        ]
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    async getImages() {
        let imageArray = [10];
        let responses = await api.get(`/venue`)
        console.log("responses of all venue data")
        console.log(responses.data.length)
        let responseArrayLength = responses.data.length
        // let randomIndex = this.getRandomInt(responseArrayLength)
        // console.log(randomIndex)
        // let responseImageUrl = responses.data[randomIndex].image
        // console.log(responseImageUrl)

        for (let i = 0; i < 10; i++) {
            let randomIndex = this.getRandomInt(responseArrayLength)
            let responseImageUrl = responses.data[randomIndex].image
            imageArray[i] = { id: i, url: responseImageUrl }
        }

        this.setState({
            images: imageArray
        })
        console.log("updated state")
        console.log(this.state.images)
    }

    async componentDidMount() {
        this.getImages()
    }

    render() {
        return (
            <TheSlideShow slides={this.state.images} />
            //the slides is the props for <theSlideShow/>
        )
    }
}