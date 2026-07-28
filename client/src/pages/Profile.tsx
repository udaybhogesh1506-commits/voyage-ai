import Sidebar from "../components/dashboard/Sidebar";

import ProfileCard from "../components/profile/ProfileCard";
import TravelPreferences from "../components/profile/TravelPreferences";
import FavoritePlaces from "../components/profile/FavoritePlaces";



function Profile(){


return(

<div
className="
min-h-screen
bg-slate-950
text-white
flex
"
>


<Sidebar/>




<main
className="
flex-1
p-8
"
>


<h1
className="
text-5xl
font-bold
mb-10
"
>

My Profile 👤

</h1>



<div
className="
space-y-8
"
>


<ProfileCard/>

<TravelPreferences/>

<FavoritePlaces/>


</div>


</main>


</div>


)

}


export default Profile;