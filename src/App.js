import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WsrTabComponent from '../src/component/risk_component/wsr_tab_component';
import AddNewWsr from '../src/component/risk_component/add_new_wsr_component';

const App = () => {
  return (
    <div>
         <Router>        
            <div>
           <Switch> 
              <Route  exact path='/'  component={WsrTabComponent} />   
               <Route path='/cform' component={AddNewWsr} /> 
          </Switch>
        </div>
      </Router> 
    </div>
  );
}
export default App;

