import {
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer,
BarChart,
Bar
} from "recharts";


const tripsData = [

{
month:"Jan",
trips:3
},

{
month:"Feb",
trips:6
},

{
month:"Mar",
trips:9
},

{
month:"Apr",
trips:5
},

{
month:"May",
trips:12
},

];



const budgetData=[

{
name:"Flights",
amount:500
},

{
name:"Hotels",
amount:900
},

{
name:"Food",
amount:300
},

{
name:"Activities",
amount:400
}

];




function AdvancedAnalytics(){


return(


<section className="
mt-10
grid
lg:grid-cols-2
gap-8
">


{/* Trip Growth */}


<div
className="
bg-slate-900
border
border-slate-800
rounded-3xl
p-8
">


<h2 className="
text-2xl
font-bold
mb-6
">

📈 Trip Growth

</h2>



<ResponsiveContainer width="100%" height={300}>


<LineChart data={tripsData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="trips"

stroke="#3b82f6"

strokeWidth={4}

/>


</LineChart>


</ResponsiveContainer>



</div>







{/* Spending */}


<div
className="
bg-slate-900
border
border-slate-800
rounded-3xl
p-8
">


<h2 className="
text-2xl
font-bold
mb-6
">

💰 Travel Spending

</h2>



<ResponsiveContainer width="100%" height={300}>


<BarChart data={budgetData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="amount"

fill="#8b5cf6"

/>


</BarChart>


</ResponsiveContainer>



</div>




</section>


)

}


export default AdvancedAnalytics;