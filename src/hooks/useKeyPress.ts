import { useEffect } from 'react';

function useKeyPress(targetKey: string, handler: () => void) {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === targetKey) {
                handler();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [targetKey, handler]);
}

export default useKeyPress; 