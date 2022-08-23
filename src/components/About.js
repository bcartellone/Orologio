import React, { useState, useEffect } from 'react';

import './About.css';
import adimage2 from './adimage2_aboutpage.jpeg';

const About = () => {
    return (
        <div>
            <div className='aboutContainer'>
                <div className='aboutBox'>
                    <h2> Since its creation is 2022, Cyborg Flying Watches has provided an unmatched experience to those looking for a luxury timepiece. We strive to provide customers with the highest quality of service in order to ensure you find the perfect piece, for the most special of occasions. </h2>
                </div>
                
        </div>
        <div className='imgContainer'>
                 <div className='imgbox'>  
                    <img className='imgsrc' src={adimage2} alt='image of a watch'/>  
                </div>   
        </div>

        
        <div className='emailContainer'>
                <div className='emailBox'>
                    <h3> Please contact us at: customercare@cyborgflying.com with questions or concerns. </h3>
                </div>
                
        </div>

        </div>
    )
};


export default About; 