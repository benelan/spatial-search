import React from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import NavBar from './Navbar';
import Search from '../search/Search';
import About from '../info/About';
import Contact from '../info/Contact'
import { Switch, Route } from 'react-router-dom';

export default props => (
    <Container fluid className={classNames('content', {'is-open': props.isOpen})}>
      <NavBar toggle={props.toggle}/>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />              
      </Switch>
    </Container>
)
