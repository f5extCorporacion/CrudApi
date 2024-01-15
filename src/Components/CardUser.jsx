

const CardUser = ({users, deletePropl, updatePropl,modalopen}) => {
  
  return (
    <div className="card ">
         <div className="cardbody flex flex-col p-3 "> 
           <img src={users?.image_url} alt="" className=" rounded-2xl  w-56" />
            <h2 className="flex flex-col">
            <img src={users?.image_url} alt="" className=" rounded-2xl w-7 h-7 w-56" />
              {users?.first_name} {users?.last_name} <hr /></h2>
              <span> <p>Email</p>{users?.email} </span>
              <span> <p> Birthday </p> {users?.birthday} <hr /> </span>
             
            <div className=" flex gap-1 flex-row-reverse">
            <button className="p-2 bg-red-400 rounded-xl  border border-slate-500" onClick={()=>{deletePropl(users.id)}}>
              <ion-icon name="trash-outline"></ion-icon> </button>  
               <button className="p-2  rounded-xl border border-slate-500" onClick={()=>{
                updatePropl(users);
                modalopen(true);
               } 
              } ><ion-icon name="create-outline" className=""></ion-icon></button>

            </div>
         </div>
    </div>
    
  )
}
export default CardUser
