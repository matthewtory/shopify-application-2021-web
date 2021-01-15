import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import omit from 'object.omit';

import { OMDbMovie } from 'data/repository/omdbRepository';

import HoverCard from './HoverCard';

interface MovieCardProps extends React.HTMLAttributes<HTMLElement> {
    movie: OMDbMovie,
    className?: string
}

const CARD_WIDTH = '252px';
const CARD_HEIGHT = '350px';


const styles = makeStyles({
    card: {
        width: CARD_WIDTH,
        minWidth: CARD_WIDTH,
        maxWidth: CARD_WIDTH,
        height: CARD_HEIGHT,
        maxHeight: CARD_HEIGHT,
        minHeight: CARD_HEIGHT,
        cursor: 'pointer',
        borderRadius: '8px',
        overflow: 'hidden'
    },
    poster: {
        objectFit: 'cover',
        height: '100%'
    },
    details: {
        position: 'absolute',
        opacity: '0',
        transition: '0.25s ease',

        '&:hover': {
            backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.4), rgba(0,0,0,0), rgba(0,0,0,0.7));',
            opacity: '1'
        }
    },
    detailsTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    detailsBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
});

const MovieCard: React.ComponentType<MovieCardProps> = (props) => {
    const {
        movie,
        className,
        children
    } = props;
    const classes = styles();

    const hasPoster = movie.Poster !== 'N/A';

    return <HoverCard {...omit(props, ['movie', 'className', 'children'])}
                      className={classNames('border', classes.card, className)}>
        {hasPoster && <img className={classes.poster} data-id={movie.imdbID} src={movie.Poster} alt={movie.Title} />}
        <div className={classNames('d-flex flex-column justify-content-between h-100 w-100', classes.details)}>
            <div className={classNames(classes.detailsTop, 'p-3')}>
                <p className={'text-light mb-1'}>{movie.Year}</p>
                <div className={'font-weight-bold text-white'}>
                    {movie.Title}
                </div>
            </div>
            <div className={classNames(classes.detailsBottom, 'p-3')}>
                {children}
            </div>
        </div>
    </HoverCard>;
};

export default MovieCard;