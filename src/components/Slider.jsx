import PropTypes from 'prop-types';
import CardSlider from './CardSlider';

function Slider({ movies }) {

    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to);
    }

    return (
        <div>
            <CardSlider title='Trending Now' data={getMoviesFromRange(0, 10)}></CardSlider>
            <CardSlider title='New Releases' data={getMoviesFromRange(10, 20)}></CardSlider>
            <CardSlider title='BlockBuster Movies' data={getMoviesFromRange(20, 30)}></CardSlider>
            <CardSlider title='Popular on Netflix' data={getMoviesFromRange(30, 40)}></CardSlider>
            <CardSlider title='Action Movies' data={getMoviesFromRange(40, 50)}></CardSlider>
            <CardSlider title='Epics' data={getMoviesFromRange(50, 60)}></CardSlider>
        </div>
    )
}

Slider.propTypes = {
    movies: PropTypes.any.isRequired,
}

export default Slider

