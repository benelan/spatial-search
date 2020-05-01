import React from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import NavBar from './Navbar';
import Search from '../search/Search';
import Faq from '../about/Faq';
import Contact from '../about/Contact'
import { Switch, Route } from 'react-router-dom';

export default props => (
    <Container fluid className={classNames('content', {'is-open': props.isOpen})}>
      <NavBar toggle={props.toggle}/>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/faq" component={Faq} />
        <Route exact path="/contact" component={Contact} />              
      </Switch>
    </Container>
)
