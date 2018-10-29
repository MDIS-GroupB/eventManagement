import React from 'react';
import Slide from './Slide';
import './SlideShow.css'
import withModal from '../HOC/withModel';

export default class TheSlideShow extends React.Component {
    render()
    //render() is like the main() function
    {
        let SlideWithModal = withModal(Slide)
        let slides = this.props.slides.map((slide) => {
            return <Slide key={slide.id} url={slide.url} />
        })
        console.log("heys" + slides)
        return (
            <div className="slide-container">
                {slides}
            </div>

        )
        //like main() function , render() also have some return value
    }
}