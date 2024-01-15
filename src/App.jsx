import { useEffect, useRef, useState } from 'react'
import './App.css'
import {base_url  ,carpeta, EMPTY_FORM_VALUES} from'./Axios/services';
import axios from 'axios';
import { useForm } from "react-hook-form";
import UsersList from './Components/UsersList';
import Swal from 'sweetalert2'

function App() {
  const [Users, setUsers] = useState([]);

  /*Este useref nos sirve para el UPDATE con el Form */
  const formRef = useRef(null);//referencia del formulario para envio de datos
  const [editarstado, setEditarestado]= useState(null)//estado para actualizar
  const [modal , setModal] = useState(false);//Open and close modal


/*Create new User */
   const HandleCreate =(FormCompleteData , form)=>{
      Swal.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Agregar, !'
       }).then((result) => {
         if (result.isConfirmed) {
           Swal.fire(
             'Agregar!',
             'Your file has been deleted.',
             'success'
           )
           axios
      .post('https://users-crud.academlo.tech/users/', FormCompleteData)
      .then( ({data})=>{
               HandleRead(); 
               form.reset()})
      .catch((err)=>console.log(err))
         }
       })
   }
/*Read Usuario */
const HandleRead =()=>{
   axios.get('https://users-crud.academlo.tech/users/')
   .then(({data})=>{setUsers(data); setModal(false)}).catch((err)=>'')
   }

   const HandleUpdate =(usersupdatecurrent)=>{
    Swal.fire({
      title: 'Deseas Actualizar?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Ya Puedes editar mira el formulario!', '', 'success')
        console.log(usersupdatecurrent);
        console.log(formRef.current)
        /*Sintaxis para cargar info al form */
        formRef.current.email.value = usersupdatecurrent.email;
        formRef.current.password.value = usersupdatecurrent.password;
        formRef.current.first_name.value = usersupdatecurrent.first_name; 
        formRef.current.last_name.value = usersupdatecurrent.last_name;
        formRef.current.birthday.value = usersupdatecurrent.birthday;
        formRef.current.image_url.value = usersupdatecurrent.image_url;
        setEditarestado(usersupdatecurrent.id)//enviamos el id del user
  
      } else if (result.isDenied) {
        Swal.fire('fue cancelada la solicitud', '', 'info')
        setModal(false)
      }
    })
   }

   const HandleUpdateUserOk =(datos,target)=>{  
   axios.put(`https://users-crud.academlo.tech/users/${editarstado}/`, datos)
   .then(({data})=>{console.log(datos);
      setEditarestado(null); 
      target.reset();
       HandleRead()}).catch((err)=>'')
   }
   /*Delete users */
   const HandleDelete =(id)=>{  
      Swal.fire({
         title: 'Eliminar Usuario?',
         text: "Hacer click si desea eliminar",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
       }).then((result) => {
         if (result.isConfirmed) {
           Swal.fire(
             'Deleted!',
             'Usuario eliminado.',
             'success'
           )
           axios.delete(`https://users-crud.academlo.tech/users/${id}/`)
           .then(({data})=>{console.log("Eliminado"); HandleRead()})
           .catch((err)=>'eliminar')
         }
         
       })
      /*
 */
   }
   
   /*Open closet modal */
   const HandleModal=()=>{
    if (modal) {
        setModal(true)
    }
   
   }
  /*function handle submit */
  const HandleSubmit = (e)=>{
  e.preventDefault();
  /*Enviamos los Valores del formulario */
   const formData = new FormData(e.target)
    const FormCompleteData = Object.fromEntries(formData);

    if(editarstado){
      //funcion que actualizar los datos
      HandleUpdateUserOk(FormCompleteData,e.target)
    }
    else{
      /*Creacion de nuevo usuario */
    HandleCreate(FormCompleteData ,e.target)
    }
  }
  
  useEffect( ()=>{
    HandleRead()
       
  },[])
  return (
      <main>

      <div className="menu flex justify-center   p-1 justify-between border-x-black">
          <div className="logo text-lg py-2 px-6 ">  </div>

           <div className="buttom bg-slate-100  rounded-sm border-red-600">
            <button className='btn1 text-white-100 text-5xl' p-1 bg-slate-100 onClick={()=> setModal(true)}><ion-icon name="add-circle-outline"></ion-icon></button>
           </div>
      </div>
        {
          modal &&(
            <div className=' fixed inset-0 bg-black bg-opacity-30
      backdrop-blur-sm flex justify-center items-center z-40'>
          <form ref={formRef} onSubmit={HandleSubmit} className='flex 
          rounded-2xl bg-neutral-600 p-10  flex-col justify-between z-12'>
            <div className="flex justify-between">
            <h2 className=' justify-center items-center text-white text-lg'>{ editarstado? "EDITAR USUARIO":"CREAR USUARIO"}</h2>
           
            <button className=' flex text-white border bg-green-600 border-zinc-200 p-1 rounded-xl
             justify-center' onClick={()=> setModal(false)} ><span>X</span></button>
            </div>

            <div className='flex gap-2 justify-center border-spacing-1 px-5   flex-col'>
              <label htmlFor="name" className='text-green-500'>First Name</label>
              <input type="text" id='first_name' placeholder='First Name' className='border p-1 justify-center border-zinc-200 bg-transparent text-white rounded-md' name='first_name' required />
            </div>
            <div className='flex gap-1 justify-center border-spacing-1 px-5 flex-col'>
              <label htmlFor="lastname" className='text-green-500'>Last Name</label>
              <input type="text" id='last_name' placeholder='Last Name' name='last_name' className='border p-1 justify-center border-zinc-200 bg-transparent text-white rounded-md' required/>
            </div>
            <div className='flex gap-1 justify-center border-spacing-1 px-5  flex-col'>
              <label htmlFor="email" className='text-green-500'>Email</label>
              <input type="text" id='email'placeholder='Email' name='email'className='border p-1 justify-center border-zinc-200 bg-transparent text-white rounded-md' required/>
            </div>
            <div className='flex gap-1 justify-center border-spacing-1 px-5  flex-col'>
              <label htmlFor="password" className='text-green-500'>Password</label>
              <input type="password" id='password'placeholder='Password'  name='password'className='border p-1 justify-center border-zinc-200 bg-transparent text-white rounded-md'  required/>
            </div>
            <div className='flex gap-1 justify-center border-spacing-1 px-5  flex-col'>
              <label htmlFor="birthday" className='text-green-500'>Birthday</label>
              <input type="date" id='birthday' placeholder='Birthday' name='birthday'className='border p-1 justify-center border-zinc-200 bg-transparent text-white rounded-md' required/>
            </div>
            <div className='flex gap-1 justify-center border-spacing-1 px-5  flex-col'>
              <label htmlFor="image_url" className='text-green-500'>image_url</label>
              <input type="text" id='image_url' name='image_url'className='border p-1 justify-center border-zinc-200 bg-transparent text-white rounded-md' required />
            </div>
            <br />
            <button type='submit' className=' p-3 bg-blue-500 rounded-2xl'>
            {editarstado? "Editar ":" Agregar"}
            </button>
          </form>
          </div>)

        }
        <br />

        <UsersList usersProp={Users} deleteProp={HandleDelete}
        updateProp ={HandleUpdate} modalopen={setModal}/>
        <br />
    </main>
  )


}

export default App
