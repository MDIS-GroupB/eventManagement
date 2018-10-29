import React from 'react';
// import './SlideShow.css'

export default class Slide extends React.Component {
    render() {
        let url = this.props.url;
        return (
            <div className="slide">
                <img src={url} />
            </div>
        );
    }
}