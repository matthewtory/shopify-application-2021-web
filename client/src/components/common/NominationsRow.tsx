import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

import { OMDbMovie } from 'data/repository/omdbRepository';
import { NOMINATION_COUNT } from 'data/store/nominate';

import MovieCard from './MovieCard';

export type NominationsRowProps = {
    nominations: OMDbMovie[],
    className?: string,
    containerClassName?: string,
    onClickMovie?: (movie: OMDbMovie) => void,
    renderMovieCardChildren?: (movie: OMDbMovie) => JSX.Element
}

const styles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflowX: 'auto'
    },
    cardContainer: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: '20%',
        height: '190px',
        minWidth: '130px',
        maxWidth: '20%',
        padding: '1%'
    },
    card: {
        width: '100%',
        minWidth: '0',
        maxWidth: 'unset',
        height: '100%',
        minHeight: 'unset',
        maxHeight: 'unset'
    },
    emptyNomination: {
        opacity: '0.05',
        border: '1px solid black',
        borderRadius: '8px'
    }
});

const NominationsRow: React.ComponentType<NominationsRowProps> = (props) => {
    const {
        nominations,
        className,
        onClickMovie,
        renderMovieCardChildren,
        containerClassName
    } = props;

    const classes = styles();

    const nominationCards: JSX.Element[] = [];

    for (let i = 0; i < NOMINATION_COUNT; i++) {
        let card: JSX.Element;

        if (nominations.length > i) {
            const nomination = nominations[i];

            card = <MovieCard
                key={nomination.imdbID}
                movie={nomination}
                className={classNames(classes.card, 'm-0')}
                onClick={() => onClickMovie?.(nomination)}
            >
                {renderMovieCardChildren?.(nomination)}
            </MovieCard>;
        } else {
            card = <div key={i} className={classNames('bg-primary', classes.card, classes.emptyNomination)}>
                &nbsp;
            </div>;
        }

        nominationCards.push(<div key={i} className={classNames(classes.cardContainer, containerClassName)}>
            {card}
        </div>);
    }

    return <div className={classNames(classes.container, className)}>
        {nominationCards}
    </div>;
};

export default NominationsRow;