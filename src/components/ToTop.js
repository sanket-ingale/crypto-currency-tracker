import React, {useState} from 'react';
import './ToTop.css';

export default function ToTop() {

    const [display, setDisplay] = useState('none');
    
    window.onscroll = function() {
        // console.log(window.scrollY); 
        if (window.scrollY > 300.0) {
            setDisplay("block");
        } else {
            setDisplay("none");
        }
    };
    
    const topFunction = () => {
        window.scrollTo(0, 0);
    }

    return (
        <button 
            id="to--top"
            onClick={topFunction} 
            style={{display: `${display}`}}
        >
            Back to top
        </button>
    );
}
