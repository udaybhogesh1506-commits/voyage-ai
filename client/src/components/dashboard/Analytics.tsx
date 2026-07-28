function Analytics(){

    return(
        <div className="
        mt-10
        bg-slate-900
        border
        border-slate-800
        rounded-3xl
        p-8
        ">

            <h2 className="
            text-3xl
            font-bold
            text-white
            ">
                📊 Travel Analytics
            </h2>


            <div className="
            grid
            md:grid-cols-3
            gap-6
            mt-8
            ">

                <div className="bg-slate-800 p-6 rounded-xl">
                    <h3 className="text-gray-400">
                        Total Trips
                    </h3>

                    <p className="text-4xl font-bold text-white">
                        25
                    </p>
                </div>


                <div className="bg-slate-800 p-6 rounded-xl">
                    <h3 className="text-gray-400">
                        Countries
                    </h3>

                    <p className="text-4xl font-bold text-white">
                        12
                    </p>
                </div>


                <div className="bg-slate-800 p-6 rounded-xl">
                    <h3 className="text-gray-400">
                        Money Spent
                    </h3>

                    <p className="text-4xl font-bold text-white">
                        ₹1.2L
                    </p>
                </div>

            </div>

        </div>
    )

}


export default Analytics;