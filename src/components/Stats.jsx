import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import quizService from "../service/quizService";

export function Stats() {
    const [stats, setStats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await quizService.getStats();
                setStats(response); 
            } catch (error) {
                console.error("Error al obtener las estadísticas:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="container">
            <h2 className="mt-4 mb-4 text-center">Estadísticas</h2>
                <div className="row justify-content-center">
                    {stats.map((stat, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Intentos exitosos: {stat.success}</h5>
                                    <hr />
                                    <h5 className="card-text">Total de intentos: {stat.total}</h5>
                                    <hr />
                                    <h5 className="card-text">Porcentaje: {((stat.success / stat.total) * 100).toFixed(2)}%</h5>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary my-2" onClick={() => navigate('/')}>Volver</button>
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default Stats;
