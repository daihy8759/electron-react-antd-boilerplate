import { createModel } from 'hox';
import { useState } from 'react';

function useWords() {
    const [words, setWords] = useState('');
    return {
        words,
        setWords,
    };
}

export default createModel(useWords);
