const places=[

{
name:"Switzerland 🇨🇭",
image:"https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99"
},

{
name:"Bali 🌴",
image:"https://images.unsplash.com/photo-1537996194471-e657df975ab4"
},

{
name:"Japan 🇯🇵",
image:"https://images.unsplash.com/photo-1528360983277-13d401cdc186"
}

];



function FavoritePlaces(){


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

Favorite Destinations 🌍

</h2>



<div
className="
grid
md:grid-cols-3
gap-6
"
>


{

places.map((place,index)=>(


<div

key={index}

className="
rounded-2xl
overflow-hidden
bg-slate-800
"

>


<img

src={place.image}

className="
h-40
w-full
object-cover
"

/>


<h3
className="
p-4
text-xl
font-bold
text-white
"
>

{place.name}

</h3>


</div>


))


}


</div>


</div>


)

}


export default FavoritePlaces;