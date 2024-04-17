import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount()
    {
        
    }

    render() {
        return (
            <div>
                <h1>This is Namaste React Web Series</h1>
                <UserClass/>
            </div>
        );
    }
};

export default About;