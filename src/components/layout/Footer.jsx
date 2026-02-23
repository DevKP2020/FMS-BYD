import { useState, useEffect } from 'react';
import moment from 'moment'

export default function Footer() {
    const [currentTime, setCurrentTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment().format('YYYY-MM-DD HH:mm:ss'));
        }, 1000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <footer className="footer w-full bottom-0 flex justify-items-start bg-secondary text-white py-2 px-4 shadow-md w-full">
            <div className="flex w-full justify-between space-x-6">
                <span className="text-white text-sm font-semibold py-1">Host : <span className='bg-green-500 rounded-xl p-1'>Connected</span></span>
                <span className="text-white text-sm font-semibold py-1">© 2026 Kuda Prima </span>
                <span className="text-white text-sm font-semibold py-1" suppressHydrationWarning >{currentTime}</span>
            </div>
        </footer>
        // <footer className="footer w-full">
        //   <span>Status: Connected</span>
        //   <span>© 2026 PT Kuda Prima</span>
        //   <span>{new Date().toLocaleString()}</span>
        // </footer>
    );
}
