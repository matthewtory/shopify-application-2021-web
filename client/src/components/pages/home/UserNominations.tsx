import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { AppState } from 'data/store';
import { getNominations } from 'data/store/nominate/selectors';
import { removeNomination } from 'data/store/nominate/actions';

import NominationsRow from 'components/common/NominationsRow';

type UserNominationsProps = {
    className?: string,
    disabled?: boolean
}


const mapState = (state: AppState) => {
    return {
        nominations: getNominations(state)
    };
};

const mapDispatch = {
    removeNomination
};

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch
type OwnProps = StateProps & DispatchProps & UserNominationsProps

const UserNominations: React.ComponentType<UserNominationsProps> = connect(mapState, mapDispatch)((props: OwnProps) => {
    const {
        nominations,
        removeNomination,
        disabled
    } = props;

    return <div className={'mb-4'}>
        <h4>Your Nominations</h4>
        <NominationsRow
            nominations={nominations}
            renderMovieCardChildren={(movie) => <>
                {!disabled && <Button color={'danger'} className={'w-100'} size={'sm'}>
                    Remove
                </Button>}
            </>}
            onClickMovie={(nomination) => !disabled && removeNomination(nomination.imdbID)} />
    </div>;
});

export default UserNominations;