import { useEffect, useState } from "react"

const useAdmin=(email)=>{
    const [isAdmin, setAdmin]=useState(false);
    const [isAdminLoading,  setIsAdminLoading]=useState(true);

    useEffect(()=>{
        if(email){
            fetch(`https://doctors-portal-server-ten-vert.vercel.app/users/admin/${email}`)
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                setAdmin(data.isAdmin)
                setIsAdminLoading(false)
            })
        }
    },[email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;