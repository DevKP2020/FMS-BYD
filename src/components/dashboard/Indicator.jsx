export default function Indicator({ indicator }) {

  return (
    <>
        <div className="flex flex-col items-center justify-center border-2 border-black rounded-md bg-gray-100 pb-2">
      
            {/* Label */}
            <div className="text-xs text-center text-black font-semibold mb-1 bg-yellow-400 w-full px-2 rounded-t-md">
                {indicator?.description}
            </div>

            {/* Lamp */}
            <div className={`w-8 h-8 rounded-full border-2 ${indicator?.state ? "bg-green-400 animate-blink" : "bg-red-400"}`} />

            {/* Text */}
            <div className="px-4 py-2 mt-1 text-xs bg-dark text-white text-center font-bold rounded-lg shadow-lg">
                <p className="hover:text-orange-500">
                    {indicator?.state ? "ON" : "OFF"}
                </p>
            </div>
            {/* <div className="text-xs mt-1 font-bold text-white">
                <button className="bg-dark">{indicator?.state ? "ON" : "OFF"}</button>
            </div> */}

        </div>
    </>
  )
}