import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h1 className="home-text fw-bold text-dark mt-2 mb-2">Welcome to my Ranking Application!</h1>
            </div>
        )
    }
}
