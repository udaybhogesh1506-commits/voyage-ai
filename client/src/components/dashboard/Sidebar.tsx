function Sidebar(){

return(

<aside
className="
hidden
md:flex
w-72
min-h-screen
bg-slate-950
border-r
border-slate-800
p-8
flex-col
"
>

<h1
className="
text-3xl
font-bold
text-white
mb-12
"
>
✈️ Voyage
<span className="text-blue-500">
AI
</span>
</h1>


<div
className="
space-y-6
text-gray-300
"
>

<p>🏠 Dashboard</p>

<p>🌍 My Trips</p>

<p>➕ Create Trip</p>

<p>🧭 Explore</p>

<p>👤 Profile</p>

<p>⚙️ Settings</p>


</div>


</aside>

)

}


export default Sidebar;