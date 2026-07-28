function ProfileCard(){

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


<div className="
flex
items-center
gap-6
">


<img

src="https://i.pravatar.cc/150"

className="
w-28
h-28
rounded-full
border-4
border-blue-500
"

/>


<div>

<h2
className="
text-3xl
font-bold
text-white
">

Uday Bhogesh

</h2>


<p
className="
text-gray-400
mt-2
">

Travel Explorer 🌎

</p>


<p
className="
text-gray-400
">

uday@example.com

</p>


</div>


</div>





<button

className="
mt-8
bg-blue-600
hover:bg-blue-700
px-6
py-3
rounded-xl
font-semibold
"

>

Edit Profile

</button>


</div>

)

}


export default ProfileCard;