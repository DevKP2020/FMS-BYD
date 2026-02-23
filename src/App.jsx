import useSWR from 'swr'
import Fetcher from './libs/Fetcher'
// import useWebSocket from "./hooks/useWebSocket";
// import { requestProbeMeasurement } from "./ws/request";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/dashboard/Dashboard";

export default function App() {

  const API = import.meta.env.VITE_PUBLIC_API_FUELPOS;

  const { data: dataPumps } = useSWR(`${API}/sitemonitoring/pumps`, Fetcher, { refreshInterval: 1000 }),
        { data: dataTanks } = useSWR(`${API}/sitemonitoring/tanks`, Fetcher, { refreshInterval: 3000 }),
        { data: dataIndicator } = useSWR(`${API}/sitemonitoring/indicator`, Fetcher, { refreshInterval: 5000 })

  return (
    <>
    <Navbar />
    <main className="min-h-screen flex flex-col">

      <div className="flex-1">
        <Dashboard pumps={dataPumps?.data ?? []} tanks={dataTanks?.data ?? []} indicators={dataIndicator?.data ?? []} />
      </div>

    </main>
    <Footer />
    </>
  );
}
