import Cookies from "js-cookie";
export function Home({ user, setUser }) {

    const handleLogOut = () => {
        Cookies.remove("access_token");
        setUser([]);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>Bienvenido a RivaLearn</h1>
                    <h2>{user}</h2>
                    <button className="btn btn-danger" onClick={handleLogOut}>Cerrar sesión</button>
                </div>
            </div>
        </div>
    )
}