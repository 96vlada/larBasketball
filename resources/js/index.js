import React from "react";
import ReactDOM from "react-dom";

import CreateLeagues from "./components/createLeagues";
import EditLeague from "./components/editLeague";

import { BrowserRouter, Switch, Route } from "react-router-dom";

if (document.getElementById("leagues")) {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route
                        path="/:id/edit"
                        component={EditLeague}
                        exact={true}
                    />
                    <CreateLeagues />
                </Switch>
            </div>
        </BrowserRouter>,
        document.getElementById("leagues")
    );
}

// if (document.getElementById("displayLeagues")) {
//     ReactDOM.render(
//         <DisplayLeagues />,
//         document.getElementById("displayLeagues")
//     );
// }
