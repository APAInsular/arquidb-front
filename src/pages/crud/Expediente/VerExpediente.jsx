import { useParams } from "react-router-dom";

const VerExpediente = () => {
    const params = useParams()

    return (
        <>
            <div>
                <h2>ID: {params.id}</h2>
            </div>
        </>
    )
}

export default VerExpediente;