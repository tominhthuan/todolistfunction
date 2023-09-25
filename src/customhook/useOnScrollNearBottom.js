import { useEffect, useRef } from 'react';

const useOnScrollNearBottom = (callback, threshold = 200) => {
    const containerRef = useRef(null);
    debugger;//(6)
    useEffect(() => {
        const container = containerRef.current;
        const handleScroll = () => {
            const scrollY = container.scrollTop;
            const containerHeight = container.clientHeight;
            const contentHeight = container.scrollHeight;
            const distanceFromBottom = contentHeight - (scrollY + containerHeight);
            if (distanceFromBottom < threshold) {
                callback();
            }
        };
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [callback, threshold]);

    return containerRef;
};

export default useOnScrollNearBottom;
