import { useEffect, useState } from 'react';

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