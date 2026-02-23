// import { useEffect, useState } from "react"

import Kp from "../../assets/images/kp.png"
import LoadingText from "../materials/LoadingText"

const Loading = () => {

    // const [text, setText] = useState('Loading...');

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setText('Stuck? Please check the server.');
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <>
        <div className="flex items-center justify-center h-screen bg-slate-200">
            <div className="grid grid-rows-2 gap-5 w-full">
                <div className="text-center h-auto w-full flex items-center justify-center content-center">
                    <img 
                        alt="Kuda Prima"
                        src={Kp}
                        width={300}
                        height={200}
                        quality={100}
                        className="motion-safe:animate-bounce"
                    />
                </div>
                <div className="text-center">
                    <p className="text-3xl h-full font-semibold bg-gradient-to-r bg-clip-text text-transparent from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 animate-text">
                        <LoadingText />
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Loading