
/*https://www.youtube.com/watch?v=XNRwOtIpR10 */

import CardUser from "./CardUser"

const UsersList = ({usersProp , deleteProp,updateProp , modalopen}) => {
  return (
    <div className="listas">
        {
            usersProp.map( (use)=>{
                return(
                   <CardUser  key={use.id} users={use} 
                   deletePropl={deleteProp}
                   updatePropl={updateProp} 
                   modalopen={modalopen}/>)
            })
        }
    </div>
  )
}
export default UsersList