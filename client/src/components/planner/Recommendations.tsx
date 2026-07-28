const hotels = [

{
name:"Grand Palace Hotel",
location:"City Center",
rating:"4.8",
price:"₹12,000/night"
},

{
name:"Luxury Resort",
location:"Beach Side",
rating:"4.6",
price:"₹15,000/night"
},

{
name:"Skyline Suites",
location:"Downtown",
rating:"4.7",
price:"₹10,000/night"
}

];




const restaurants = [

{
name:"The Royal Kitchen",
type:"Indian Cuisine",
rating:"4.9"
},

{
name:"Ocean View Cafe",
type:"Sea Food",
rating:"4.7"
},

{
name:"Street Food Hub",
type:"Local Food",
rating:"4.6"
}

];




function Recommendations(){


return(

<div
className="
mt-10
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
mb-8
"
>

✨ Recommended Places

</h2>





{/* Hotels */}


<h3
className="
text-2xl
font-bold
mb-5
"
>

🏨 Best Hotels

</h3>




<div
className="
grid
md:grid-cols-3
gap-6
mb-10
"
>


{

hotels.map((hotel,index)=>(


<div
key={index}
className="
bg-slate-800
rounded-2xl
p-6
hover:-translate-y-2
transition
"
>


<h4
className="
text-xl
font-bold
"
>

{hotel.name}

</h4>



<p
className="
text-gray-400
mt-3
"
>

📍 {hotel.location}

</p>



<p
className="
mt-2
"
>

⭐ {hotel.rating}

</p>



<p
className="
text-blue-400
mt-2
"
>

💰 {hotel.price}

</p>



</div>


))


}


</div>







{/* Restaurants */}



<h3
className="
text-2xl
font-bold
mb-5
"
>

🍽️ Popular Restaurants

</h3>




<div
className="
grid
md:grid-cols-3
gap-6
"
>


{

restaurants.map((item,index)=>(


<div

key={index}

className="
bg-slate-800
rounded-2xl
p-6
hover:-translate-y-2
transition
"

>


<h4
className="
text-xl
font-bold
"
>

{item.name}

</h4>



<p
className="
text-gray-400
mt-3
"
>

🍴 {item.type}

</p>



<p
className="
mt-2
"
>

⭐ {item.rating}

</p>



</div>


))


}


</div>






</div>


)

}


export default Recommendations;