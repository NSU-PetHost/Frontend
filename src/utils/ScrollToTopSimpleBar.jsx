import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

const ScrollToTopSimpleBar = ({ children }) => {
    const location = useLocation();
    const simpleBarRef = useRef(null);

    useEffect(() => {
        if (simpleBarRef.current) {
            simpleBarRef.current.getScrollElement().scrollTop = 0;
        }
    }, [location]);

    return (
        <SimpleBar style={{ maxHeight: '100vh', marginTop: '64px' }} ref={simpleBarRef}>
            {children}
        </SimpleBar>
    );
};

export default ScrollToTopSimpleBar;
