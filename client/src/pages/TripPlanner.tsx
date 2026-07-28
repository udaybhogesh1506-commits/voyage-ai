import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import TripForm from "../components/planner/TripForm";
import AIItinerary from "../components/planner/AIItinerary";
import TravelDetails from "../components/planner/TravelDetails";
import Recommendations from "../components/planner/Recommendations";
import MapSection from "../components/planner/MapSection";



function TripPlanner(){


const [trip,setTrip] = useState({

destination:"",
budget:"",
travelers:""

});




return(


<div
className="
min-h-screen
bg-slate-950
text-white
flex
"
>


{/* Sidebar */}

<Sidebar/>







{/* Main Content */}

<main
className="
flex-1
p-8
overflow-y-auto
"
>





{/* Header */}

<div
className="
mb-10
"
>


<h1
className="
text-5xl
font-bold
bg-gradient-to-r
from-blue-400
to-purple-500
bg-clip-text
text-transparent
"
>

AI Trip Planner 🤖

</h1>




<p
className="
text-gray-400
mt-3
text-lg
"
>

Create personalized AI powered travel experiences

</p>


</div>









{/* Planner Section */}


<div
className="
grid
xl:grid-cols-2
gap-10
"
>





{/* Trip Form */}

<div>

<TripForm

setTrip={setTrip}

/>

</div>







{/* AI Itinerary */}

<div>

<AIItinerary

trip={trip}

/>

</div>






</div>









{/* Travel Insights */}

<TravelDetails

trip={trip}

/>









{/* Hotels + Restaurants */}

<Recommendations/>









{/* Map Section */}

<MapSection

trip={trip}

/>






</main>


</div>


)

}


export default TripPlanner;