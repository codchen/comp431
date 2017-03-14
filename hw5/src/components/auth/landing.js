import React from 'react';

import { LandingNavigation } from './container/containers'

import { logo } from '../../assets'

// The main landing view
const Landing = () => {
    return (
        <div className='landingBackground'>
        	<LandingNavigation />
            <img src={ logo } className='landingLogo' />
        </div>
    )
}

export default Landing