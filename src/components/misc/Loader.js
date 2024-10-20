import Image from 'next/image';
import React from 'react';

const Loader = () => (
    <div>
        <Image 
            src="/loader-green.gif" alt="Loading..." 
            width={480} height={360}
            />
    </div>
);

export default Loader;