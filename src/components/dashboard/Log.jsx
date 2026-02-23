import { useMemo, useState, useEffect } from 'react'
import moment from 'moment'
import DataTable from 'react-data-table-component'
import CustomLoader from '../materials/CustomLoader'
import useSWR from 'swr'
import Fetcher from '../../libs/Fetcher'

export default function Log() {

    const [pending, setPending] = useState(true)
    const [rows, setRows] = useState([])
    const startDate = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss')
    const endDate = moment().endOf('week').format('YYYY-MM-DD HH:mm:ss')

    const API = import.meta.env.VITE_PUBLIC_API_FUELPOS;

    const { data: dataLogs } = useSWR(`${API}/deviceLogs/range?start=${startDate}&end=${endDate}`, Fetcher, { refreshInterval: 5000 })

    const filteredData = useMemo(() => {
        return dataLogs?.data?.filter(data => {
            const logDate = moment(data.dateTime)
            const logFilter = logDate.isBetween(startDate, endDate, null, '[]')

            return logFilter
        }).sort((a, b) => moment(b.dateTime) - moment(a.dateTime)).slice(0, 100)
    }, [dataLogs, startDate, endDate])

    const customStyles = {
        tableWrapper: {
            style: {
                borderRadius: 0,
            },
        },
        headRow: {
            style: {
                backgroundColor: '#0f2a44;',
                color: 'white',
            }    
        },
        headCells: {
            style: {
                justifyContent: 'center',
            }
        },
        cells: {
            style: {
                justifyContent: 'center',
            },
        },
        pagination: {
            style: {
                borderRadius: 'inherit'
            }
        }
    };

    const columns = [
        {
            name: 'Date Time',
            selector: row => row.dateTime,
            sortable: true,
        },
        {
            name: 'Device',
            selector: row => row.deviceType,
            sortable: true,
            width: '90px'
        },
        {
            name: 'Event',
            selector: row => row.state,
            sortable: true,
        },
        {
            name: 'Severity',
            sortable: true,
            width: '90px',
            cell: (row) => (
                <span className={`${row.code == 'High' ? 'bg-red-500' : row.code == 1 ? 'bg-green-500' : 'bg-yellow-500'} w-full text-center text-white rounded-xl p-1`}>{row.state}</span>
            )
        }
    ];

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(filteredData);
            setPending(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [filteredData]);

    return (
        <div className='w-full h-full max-h-[80vh] overflow-auto p-2 bg-white rounded-lg shadow-md'>
            <div className="border-2 border-black rounded-md pb-1">
            <DataTable
                columns={columns}
                data={rows}
                fixedHeader
                fixedHeaderScrollHeight="205px"
                highlightOnHover
                customStyles={customStyles}
                dense
                striped
                noDataComponent="No data available"
                responsive
                pagination
                sortable
                progressPending={pending}
                progressComponent={<CustomLoader />}
            />
            </div>
        </div>
    )
}