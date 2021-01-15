import React from 'react';
import { Alert, Button, Col, Container, Row, Spinner } from 'reactstrap';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { AppState } from 'data/store';
import { isFinished } from 'data/store/nominate/selectors';
import { submitNominations } from 'data/store/nominate/actions';

import SearchResultsList from './SearchResultsList';
import UserNominations from './UserNominations';
import SearchField from './SearchField';

const styles = makeStyles({
    container: {
        minHeight: '100vh'
    },
    searchField: {},
    submitButton: {
        fontSize: '1.25rem',
        fontWeight: 400,
        borderRadius: '16px',
        padding: '0.6em 0em'
    }
});

const mapState = (state: AppState) => {
    return {
        isFinished: isFinished(state),
        isSubmitting: state.nominate.isSubmitting,
        error: state.nominate.error,
        submissionId: state.nominate.submissionId
    };
};

const mapDispatch = {
    submitNominations
};

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch

type OwnProps = StateProps & DispatchProps

const Home: React.ComponentType = connect(mapState, mapDispatch)((props: OwnProps) => {
    const {
        isFinished,
        isSubmitting,
        error,
        submissionId,
        submitNominations
    } = props;

    const classes = styles();

    if (submissionId) {
        return <Redirect to={`/results/${submissionId}`} push />;
    }

    return <Container className={classNames('d-flex flex-column justify-content-start', classes.container)}>
        <Row className={'justify-content-center'}>
            <Col xs={12} lg={8}>
                <UserNominations disabled={isSubmitting} />
            </Col>
        </Row>
        {!!error && <Alert color={'danger'}>{`${error}`}</Alert>}
        <Row className={'justify-content-center'}>
            <Col xs={12} lg={8}>
                {!isFinished ? <>
                        <SearchField className={'w-100'} />
                        <SearchResultsList className={'w-100'} />
                    </> :
                    <Row className={'d-flex justify-content-center'}>
                        <Col xs={12} lg={5} className={'d-flex justify-content-center'}>
                            {!isSubmitting ? <Button disabled={isSubmitting} color={'primary'}
                                                     onClick={() => !isSubmitting && submitNominations()}
                                                     className={classNames(classes.submitButton, 'w-100')}>
                                Submit Nominations
                            </Button> : <Spinner color={'primary'} size={'md'} />}
                        </Col>
                    </Row>}
            </Col>
        </Row>

    </Container>;
});

export default Home;