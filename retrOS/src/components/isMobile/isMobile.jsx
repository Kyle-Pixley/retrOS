import { useEffect, useState } from 'react';

//finds out if user is on a screen 799px wide or smaller for mobile accessibility  
function isMobile() {
    const [ userIsMobile, setUserIsMobile ] = useState(() => window.matchMedia("(max-width: 799px)").matches);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 799px)");

        setUserIsMobile(media.matches);

        const handler = e => setUserIsMobile(e.matches);

        media.addEventListener("change",handler);
        return () => media.removeEventListener("change", handler);
    },[]);

    return userIsMobile;
}

export default isMobile;