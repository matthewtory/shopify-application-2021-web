import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Container, Spinner } from 'reactstrap';

import { AppState } from 'data/store';
import { getCurrentUser } from 'data/store/auth/selectors';

import Results from './pages/results';
import Home from './pages/home';

import 'scss/index.scss';

const styles = makeStyles({
    loadingWrapper: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapState = (state: AppState) => {
    return {
        currentUser: getCurrentUser(state)
    };
};

type StateProps = ReturnType<typeof mapState>
type OwnProps = StateProps

const App = connect(mapState)((props: OwnProps) => {
    const {
        currentUser
    } = props;

    const classes = styles();

    if (!currentUser) {
        return <div className={classes.loadingWrapper}>
            <Spinner color={'primary'} />
        </div>;
    }

    return (
        <HashRouter>
            <Container>
                <div className={'my-3 my-lg-5 '}>Welcome to <h1 className={'text-primary mb-1'}>The Shoppies</h1>
                    <small className={'text-muted'}>By Matthew Tory for Shopify 😁</small>
                </div>
            </Container>
            <Switch>
                <Route path={'/results/:submissionId?'} component={Results} />
                <Route path={'/'} component={Home} />
            </Switch>
        </HashRouter>
    );
});

export default App;
