import React from "react";

function Header(props) {

    const logIn = () => {
        props.gameHandler("TicTacToe")
    }

    const signUp = () => {
        props.gameHandler("TicTacToe")
    }

    return(
        <div className="header">
            <h2>Employee Satisfaction</h2>
            <div className="loginButtons">
                <button onClick={logIn}>Log in</button>
                <button onClick={signUp}>Sign up</button>
            </div>
        </div>
    )
}

export default Header;