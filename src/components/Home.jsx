
export function Home ({user, setUser}){
    
    const handleLogOut = () =>{
        setUser([])
    }
   
    return(
        <div>
            <h1>Bienvenido a RivaLearn</h1>
            <h2>{user}</h2>
            <button onClick={handleLogOut}>Cerrar sesion</button>
        </div>
    )
}