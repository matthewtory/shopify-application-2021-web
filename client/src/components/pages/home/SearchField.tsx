import React, { useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppState } from 'data/store';
import { getNominationQuery, getNominations } from 'data/store/nominate/selectors';
import { updateQuery } from 'data/store/nominate/actions';

const mapState = (state: AppState) => {
    return {
        query: getNominationQuery(state),
        nominations: getNominations(state)
    };
};

const styles = makeStyles({
    input: {
        backgroundColor: 'transparent',
        borderBottom: '5px solid black',
        fontSize: '2em',
        outline: 'none',
        fontWeight: 500,
        '&::placeholder': {
            color: 'rgba(0, 0, 0, 0.3)'
        }
    }
});

const mapDispatch = {
    updateQuery
};

export type SearchFieldProps = {
    className?: string
}

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch

type OwnProps = StateProps & DispatchProps & SearchFieldProps

const SearchField: React.ComponentType<SearchFieldProps> = connect(mapState, mapDispatch)((props: OwnProps) => {
    const {
        query,
        updateQuery,
        className,
        nominations
    } = props;

    useEffect(() => {
        inputRef.current?.focus()
    }, [nominations])

    const inputRef = useRef<HTMLInputElement>(null);

    const classes = styles();

    return <>
        <input
            ref={inputRef}
            type={'text'}
            className={classNames(
                'text-primary',
                'border-top-0 border-left-0 border-right-0 border-primary mb-1',
                classes.input,
                className
            )}
            placeholder={'Search for a film to nominate'}
            value={query}
            onChange={(e) => updateQuery(e.target.value)} />
        {nominations.length >= 1 && nominations.length < 3 && <small className={'text-muted'}>
            <FontAwesomeIcon icon={faInfoCircle} className={'mr-2'}/>
            Select five films to nominate, then you can submit!
        </small>}
    </>
});

export default SearchField;