function StatsCards(){


const stats=[

{
icon:"✈️",
title:"Total Trips",
value:"12"
},

{
icon:"🌍",
title:"Destinations",
value:"25"
},

{
icon:"💰",
title:"Travel Budget",
value:"$2400"
},

{
icon:"⭐",
title:"Rating",
value:"4.9"
}

];


return(

<div
className="
grid
md:grid-cols-4
gap-6
"
>


{
stats.map((item,index)=>(


<div
key={index}
className="
bg-slate-900
border
border-slate-800
rounded-2xl
p-6
hover:border-blue-500
transition
"
>

<h2
className="
text-4xl
"
>
{item.icon}
</h2>


<p
className="
text-gray-400
mt-4
"
>
{item.title}
</p>


<h3
className="
text-3xl
font-bold
text-white
mt-2
"
>
{item.value}
</h3>


</div>


))
}


</div>

)

}


export default StatsCards;