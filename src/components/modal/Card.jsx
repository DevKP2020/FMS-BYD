import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { TiBusinessCard } from "react-icons/ti";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function Card({ setOpenModalCard }) {
    
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative p-4 w-full max-w-6xl h-full md:h-auto" style={{ maxHeight: "90vh" }}>
                    <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t-xl bg-dark">
                            <h3 className="text-3xl font-semibold text-white">
                                Cards
                            </h3>
                            <button
                                className="text-white bg-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setOpenModalCard(false)}
                            >
                            x
                            </button>
                        </div>
                        <div className="w-full h-full p-4 bg-grey rounded-b-xl">
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <div className="w-full md:w-full h-full mb-2">
                                    <div className="flex items-center justify-center text-white text-xl mb-3 font-semibold">
                                        <p className="p-2 text-2xl bg-dark font-semibold rounded-lg">
                                            Add New Card
                                        </p>
                                    </div>
                                    <form>
                                        <div className="grid grid-cols-3 gap-2">
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <TiBusinessCard className="mr-2 h-8 w-5" aria-hidden="true" />
                                                <TextField className='w-full' type='search' id="input-with-sx" label="No. Card" variant="standard" />
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <IoPersonCircleOutline className="mr-2 h-8 w-5" aria-hidden="true" />
                                                <TextField className='w-full' type='search' id="input-with-sx" label="Driver Name" variant="standard" />
                                            </Box>
                                            {/* <TextField className='w-full' id="filled-basic" variant="filled" label="Nomor" type="search" /> */}
                                            {/* <TextField className='w-full' id="filled-basic" variant="filled" label="Username" type="search" /> */}
                                            <button 
                                                type="submit" 
                                                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center"
                                            >
                                            Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                {/* <DataTable
                                    columns={columns}
                                    data={filteredData}
                                    fixedHeader
                                    fixedHeaderScrollHeight="350px"
                                    highlightOnHover
                                    customStyles={customStyles}
                                    dense
                                    striped
                                    noDataComponent="No data available"
                                    responsive
                                    pagination
                                    sortable
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="opacity-50 fixed z-40"></div>
        </>
    );
}