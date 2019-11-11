import React from 'react'
import ReactDOM from "react-dom"
import Root from "./app"

import 'babel-polyfill'

ReactDOM.render(
    <Root author="Shaye"/>,
    document.getElementById("app")
);