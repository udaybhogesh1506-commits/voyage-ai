import { useState } from "react";


function TripForm({setTrip}:any){


const [destination,setDestination]=useState("");

const [budget,setBudget]=useState("");

const [travelers,setTravelers]=useState("");




const generatePlan=()=>{


setTrip({

destination,

budget,

travelers

});


};




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
mb-6
"
>

Create Your Trip ✈️

</h2>




<input

placeholder="Destination"

value={destination}

onChange={(e)=>
setDestination(e.target.value)
}

className="
w-full
bg-slate-800
p-4
rounded-xl
mb-4
"

/>





<input

placeholder="Budget"

value={budget}

onChange={(e)=>
setBudget(e.target.value)
}

className="
w-full
bg-slate-800
p-4
rounded-xl
mb-4
"

/>






<input

placeholder="Number of Travelers"

value={travelers}

onChange={(e)=>
setTravelers(e.target.value)
}

className="
w-full
bg-slate-800
p-4
rounded-xl
mb-6
"

/>





<button

onClick={generatePlan}

className="
bg-blue-600
px-6
py-3
rounded-xl
font-bold
hover:bg-blue-700
"

>

Generate AI Trip 🚀

</button>



</div>


)

}


export default TripForm;