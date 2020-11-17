import * as React from "react";
import { ThemeProvider } from '@material-ui/styles';
import { UserContext } from "./contexts/UserContextProvider"
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Redirect, Switch, useHistory } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AuthService from "./services/AuthService"
import { theme } from "./themes/theme";
import LoginSignUp from "./pages/LoginSignUp";
import Home from "./pages/Home";
import Page from "./components/Page";

function App() {
	const user = React.useContext(UserContext);
	const history = useHistory();


    const DefaultRoutes = () => {
      return (
        <div>
          <Page>
            <Switch>
                <ProtectedRoute exact path="/home" component={Home} />
            </Switch>
          </Page>

        </div>
      );
	};
	
	React.useEffect(() => {
      if(document.cookie.indexOf('token') === -1){
                  AuthService.withCookie()
                        .then((data) => {
                            if (data.user) {
								user.setProfile(data.user);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
      }
    },[])

    return (
        <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <Route path="/">
						{!user.profile ?
							<Redirect to="/signup" /> :
							<Redirect to="/home" />
						}
                    </Route>
                    <Switch>
                        <Route path="/login" component={LoginSignUp} />
                        <Route path="/signup" component={LoginSignUp} />    
                        <Route component={DefaultRoutes} />
                    </Switch>
                </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
