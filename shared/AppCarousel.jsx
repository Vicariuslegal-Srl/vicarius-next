import {Fragment, useEffect, useRef, useState} from "react";
import {FlexBox} from "./Typography";

export const AppCarousel = ({children, name, skip, defaultFrames = 3, auto= false, autoIntervalTimeOut = 1000}) => {

    const [translation, setTranslation] = useState(0);
    const [frames, setFrames] = useState(0);
    const [currentFrame, setCurrentFrame] = useState(0);
    const carouselRef = useRef();

    useEffect(() => {
        const carouselWidth = carouselRef.current.scrollWidth - (carouselRef.current.offsetWidth / 1.5);
        const framesResult = Math.round(carouselWidth / (skip ? skip : carouselWidth)) > defaultFrames
            ? defaultFrames
            : Math.round(carouselWidth / (skip ? skip : carouselWidth));
        setFrames(framesResult);
    }, [skip])

    useEffect(() => {
        if (auto){
            const interval = setInterval(() => {
                let resultBuffer;
                const carouselWidth = carouselRef.current.scrollWidth - (carouselRef.current.offsetWidth / 1.5);
                if ((translation - skip) > (carouselWidth * -1)){
                    resultBuffer = translation - skip;
                    setCurrentFrame(currentFrame + 1)
                } else {
                    resultBuffer =  0;
                    setCurrentFrame(0)
                }
                return setTranslation(resultBuffer);
            }, autoIntervalTimeOut);
            return () => clearInterval(interval);
        }
    }, [translation, skip]);

    const scroll = side => {
        let resultBuffer;
        const carouselWidth = carouselRef.current.scrollWidth - (carouselRef.current.offsetWidth / 1.5);
        if (side === 'right'){
            if ((translation - skip) > (carouselWidth * -1)){
                resultBuffer = translation - skip;
                setCurrentFrame(currentFrame + 1)
            } else {
                resultBuffer =  0;
                setCurrentFrame(0)
            }
        } else {
            if ((translation + skip) < 0){
                resultBuffer = translation + skip;
                setCurrentFrame(currentFrame - 1)
            } else {
                resultBuffer =  0;
                setCurrentFrame(0)
            }

        }
        return setTranslation(resultBuffer);
    }

    return <div className='app-carousel'>
        {!auto && <Fragment>
            <span className='app-carousel__btn left fa fa-arrow-left' onClick={() => scroll('left')} />
            <span className='app-carousel__btn right fa fa-arrow-right' onClick={() => scroll('right')} />
        </Fragment>}
        <div className='app-carousel__wrapper' style={{
            transform: `translateX(${translation}px)`
        }} ref={carouselRef}>
            {children}
        </div>
        {!auto && <FlexBox justify='center'>
            {Array(frames).fill(null).map((frame, i) => <span
                key={i}
                className={'app-carousel__scroll-item ' + ((currentFrame === i) || (currentFrame >= frames && i === (frames - 1)) ? 'active' : '')}/>)}
        </FlexBox>}
    </div>
}