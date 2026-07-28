const preferences=[

"Adventure 🏔️",
"Luxury ✨",
"Beach 🏖️",
"Food 🍜",
"Culture 🏛️"

];


function TravelPreferences(){


return(

<div
className="
bg-slate-900
border
border-slate-800
rounded-3xl
p-8
"
>


<h2
className="
text-3xl
font-bold
text-white
mb-6
"
>

Travel Preferences ✈️

</h2>



<div
className="
flex
flex-wrap
gap-4
"
>


{

preferences.map((item,index)=>(


<div

key={index}

className="
bg-blue-600/20
border
border-blue-500
px-5
py-3
rounded-full
text-white
"

>

{item}

</div>


))

}


</div>


</div>


)

}


export default TravelPreferences;