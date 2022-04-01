import React from 'react';
import { Bars } from  'react-loader-spinner'

function Loader() {
    return (
    <div>
        <div id="overlay"></div>
        <div className="loader">
            <Bars
                height="100"
                width="110"
                color='#0ead69'
                ariaLabel='loading'
                radius = {1}
            />
        </div>
    </div>
    );
}

export default Loader;