export default function AlarmIndicator({ label, value}) {
      return (
    <div className="flex flex-col items-center justify-center border-2 border-black rounded-md bg-gray-100 pb-2">
      
      {/* Label */}
      <div className="text-xs text-center text-black font-semibold mb-1 bg-yellow-300 w-full px-2 rounded-t-md">
        {label}
      </div>

      {/* Lamp */}
      <div
        className={`w-8 h-8 rounded-full border-2 ${
          value ? "bg-green-500" : "bg-red-400"
        }`}
      />

      {/* Text */}
      <div className="text-xs mt-1 font-bold text-white">
        <button className="bg-dark">{value ? "ON" : "OFF"}</button>
      </div>

    </div>
  );
}