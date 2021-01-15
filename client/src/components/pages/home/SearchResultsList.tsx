import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Button, Spinner } from 'reactstrap';

import { AppState } from 'data/store';
import { getNominationQueryResults, getNominations } from 'data/store/nominate/selectors';
import { addNomination, removeNomination } from 'data/store/nominate/actions';

import MovieCard from 'components/common/MovieCard';

type SearchResultsListProps = {
    className?: string
}

const styles = makeStyles({
    container: {
        overflowX: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    }
});

const mapState = (state: AppState) => {
    return {
        results: getNominationQueryResults(state),
        nominations: getNominations(state),
        hasQuery: !!state.nominate.query
    };
};

const mapDispatch = {
    addNomination,
    removeNomination
};

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch

type OwnProps = StateProps & DispatchProps & SearchResultsListProps

const SearchResultsList: React.ComponentType<SearchResultsListProps> = connect(mapState, mapDispatch)((props: OwnProps) => {
    const {
        className,
        addNomination,
        removeNomination,
        results,
        nominations,
        hasQuery
    } = props;

    const classes = styles();

    return <div className={classNames(classes.container, className)}>
        {results === null ? (
            <div className={'d-flex justify-content-center mt-4 w-100'}>
                <Spinner color={'primary'} />
            </div>
        ) : <>
            {results.map(r => {
                const isNominated = !!nominations.find(n => n.imdbID === r.imdbID);

                return <MovieCard key={r.imdbID} movie={r} className={'mx-3 my-4'}
                                  onClick={() => isNominated ? removeNomination(r.imdbID) : addNomination(r)}>
                    {isNominated ? <Button color={'danger'} className={'w-100'}>
                        Remove
                    </Button> : <Button color={'primary'} className={'w-100'}>
                        Nominate
                    </Button>}
                </MovieCard>;
            })}
        </>}
        {results?.length === 0 && hasQuery && <div className={'d-flex justify-content-center mt-4 w-100'}>
            <h5 className={'text-muted'}>No Results :(</h5>
        </div>}
    </div>;
});

export default SearchResultsList;