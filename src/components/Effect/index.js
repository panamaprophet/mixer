import React from 'react';

import Fader from '/components/Fader';


const Effect = ({
    name = 'Untitled',
    parameters = [],
    onParamChange = () => {},
}) => {
    return (
        <div className="effect">
            <div className="title">{name}</div>

            {parameters && parameters.map(parameter => (
                <div className="param" key={parameter.id}>
                    <span className="param__title">{parameter.name}:</span>
                    <Fader onChange={onParamChange(parameter.id)} position={parameter.value} />
                </div>
            ))}
        </div>
    );
}

export default Effect;