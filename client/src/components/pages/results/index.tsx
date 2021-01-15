import React, { useEffect, useState } from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Button, Col, Container, Row, Spinner } from 'reactstrap';
import { makeStyles } from '@material-ui/styles';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { AppState } from 'data/store';
import { getError, getResults, getSubmission, hasSubmission } from 'data/store/results/selectors';
import { clearSubmission, fetchResults, fetchSubmission } from 'data/store/results/actions';

import NominationsRow from 'components/common/NominationsRow';
import NominationResultRow from './NominationResultRow';


type ResultsParams = {
    submissionId?: string
}

const styles = makeStyles({
    cardContainer: {
        height: '300px'
    }
});

const mapState = (state: AppState) => {
    return {
        error: getError(state),
        results: getResults(state),
        submission: getSubmission(state),
        hasSubmission: hasSubmission(state)
    };
};

const mapDispatch = {
    fetchSubmission,
    fetchResults,
    clearSubmission
};

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch
type RouteProps = RouteComponentProps<ResultsParams>

type OwnProps = StateProps & DispatchProps & RouteProps

const Results: React.ComponentType<RouteProps> = connect(mapState, mapDispatch)((props: OwnProps) => {
    const {
        match: {
            params: {
                submissionId
            }
        },
        error,
        results,
        submission,
        hasSubmission,
        fetchResults,
        fetchSubmission,
        clearSubmission
    } = props;

    const classes = styles();

    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    useEffect(() => {
        if (submissionId) {
            fetchSubmission(submissionId);
        } else {
            clearSubmission();
        }
    }, [submissionId, fetchSubmission]);

    let minVotes: number | undefined;
    let maxVotes: number | undefined;

    if (results) {
        const votes = results.reduce((votes, result) => ({
            minVotes: votes.minVotes !== undefined ? Math.min(votes.minVotes, result.nominations) : result.nominations,
            maxVotes: votes.maxVotes !== undefined ? Math.max(votes.maxVotes, result.nominations) : result.nominations
        }), { minVotes, maxVotes });

        minVotes = votes.minVotes;
        maxVotes = votes.maxVotes;
    }

    const [didShare, setDidShare] = useState(false);

    return <Container className={'mb-4'}>
        {error && <Alert color={'danger'}>{`${error}`}</Alert>}
        <Row>
            <Col xs={12} lg={6}>
                {hasSubmission && <h4 className={'mb-3 mr-auto'}>Your Nomination</h4>}
            </Col>
            <Col xs={12} className={'flex-shrink-1'}>
                {hasSubmission && <CopyToClipboard text={window.location.href} onCopy={() => setDidShare(true)}>
                    <Button className={'mr-3 mb-3'} id={'shareButton'} color={'primary'}
                            onMouseLeave={() => didShare && setTimeout(() => setDidShare(false), 1000)}>
                        {!didShare ? <>
                            <FontAwesomeIcon icon={faShare} className={'mr-2'} />
                            Share Selections
                        </> : 'Copied!'}
                    </Button>
                </CopyToClipboard>}
                <NavLink to={'/'}>
                    <Button color={'primary'} className={'mb-3'} outline>
                        Nominate Another
                    </Button>
                </NavLink>
            </Col>

        </Row>
        {hasSubmission && (
            submission ? (
                    <NominationsRow
                        className={'mb-4'}
                        nominations={submission}
                        containerClassName={classes.cardContainer} />
                ) :
                <div className={'d-flex justify-content-center my-3'}>
                    <Spinner color={'primary'} />
                </div>

        )}
        <h4>Top 10 Nominations</h4>
        {results ? (
            results.map(r => <NominationResultRow key={r.imdbID} minVote={minVotes ?? 0} maxVote={maxVotes ?? 0}
                                                  result={r} />)
        ) : <div className={'d-flex justify-content-center my-3'}>
            <Spinner color={'primary'} />
        </div>}
    </Container>;
});

export default withRouter(Results);