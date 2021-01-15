import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card } from 'reactstrap';
import classNames from 'classnames';

export interface HoverCardProps extends React.HTMLAttributes<HTMLElement> {
    className?: string,
}

const styles = makeStyles({
    card: {
        boxShadow: '0 .5rem 1rem rgba(0,0,0,.1)',
        transition: 'ease 0.2s',
        '&:hover': {
            boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)',
            transform: 'scale(0.975)'
        }
    },
    clickableCard: {
        cursor: 'pointer',
        textDecoration: 'none !important'
    }
});

const HoverCard: React.ComponentType<HoverCardProps> = (props) => {
    const {
        className,
        children
    } = props;

    const classes = styles();

    let card = <Card {...props} className={classNames(classes.card, className)}>
        {children}
    </Card>;

    return card;
};

export default HoverCard;

