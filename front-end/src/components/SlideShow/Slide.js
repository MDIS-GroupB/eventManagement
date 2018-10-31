import React from 'react';
// import './SlideShow.css'
import { Link } from 'react-router-dom'

export default class Slide extends React.Component {
    constructor() {
        this.routeChange = this.routeChange.bind(this);

    }

    routeChange() {
        let path = `/Login`
        this.props.history.push(path)
    }


    render() {
        let url = this.props.url;
        return (
            <div className="slide">
                {/* <Link to={`/venue/${venue._id}`}></Link> */}
                {/* <Link to={`/event/${event._id}`}></Link> */}
                <img src={url} onClick={() => this.handleChangeEvent()} />
            </div>
        );
    }
}