// import Image from "next/image"
import { useEffect, useState } from "react";
import Kp from "../../assets/images/kp.png"

export default function Navbar() {

    return (
        <header className="w-full">
            <nav className="flex items-center justify-between px-6 py-3 bg-white text-dark">
                <div className="flex items-center gap-3">
                    <img
                    src={Kp}
                    alt="Kuda Prima"
                    className="h-10 w-auto"
                    />

                    <p className="text-2xl font-semibold bg-gradient-to-r bg-clip-text text-transparent from-green-400 to-blue-500">
                    FUEL MONITORING SYSTEM
                    </p>

                </div>
                <div className="flex items-end">
                    <div className={`p-2 mr-3 rounded-xl size-6 ${status ? 'bg-green-500' : 'bg-red-500'}`}>
                        <span className='text-xl font-semibold'></span>
                    </div>
                </div>
            </nav>
        </header>
    );
}