import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Col, Row } from 'reactstrap';

import { MovieNominationResult } from 'data/repository/firebaseRepository';

export type NominationResultRowProps = {
    result: MovieNominationResult,
    minVote: number,
    maxVote: number
}

const styles = makeStyles({
    imageContainer: {
        maxWidth: '120px'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    voteBar: {
        height: '32px'
    }
});

const NominationResultRow: React.ComponentType<NominationResultRowProps> = (props) => {
    const {
        result,
        maxVote
    } = props;

    const classes = styles();

    return <Row className={'d-flex my-2'}>
        <Col xs={4} lg={2} className={classes.imageContainer}>
            {result.Poster !== 'N/A' && <img src={result.Poster} className={classes.image} />}
        </Col>
        <Col  className={'flex-grow-1'}>
            <div className={classNames(classes.voteBar, 'bg-primary mb-3')}
                 style={{ width: `calc(${Math.ceil((result.nominations / maxVote) * 100)}%)` }}>
                &nbsp;
            </div>
            <h6 className={'mb-1'}>
                {result.Title}
            </h6>
            <span className={'text-muted'}>{result.Year}</span>
        </Col>
        <Col className={'flex-shrink-1 flex-grow-0'}>
            <h4 className={'mr-3'}>{result.nominations}</h4>

        </Col>

    </Row>;
};

export default NominationResultRow;