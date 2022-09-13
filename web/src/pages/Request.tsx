// (c) Tecnologico de Monterrey 2022, rights reserved.
import Document_Review from "../components/Document_Review";
import Request_Detail from "../components/Request_Card_Detail";
import Foot from "./includes/Footer";
import NavBar from "./includes/NavBar";

const Request = (): JSX.Element => {
    return (
        <div>
            <NavBar />
            <div className="w-full flex gap-4 pt-16 px-24">
                <div className="w-2/5 space-y-4">
                    <Request_Detail />
                </div>
                <div className="pt-6 space-y-2">
                    <h2 className="text-lg text-[#396FB1] font-medium">Documentos</h2>
                    <div className="divide-y divide-solid space-y-4">
                        <Document_Review />
                        <Document_Review />
                        <Document_Review />
                    </div>
                    <p>Botones</p>
                </div>
            </div>
            <Foot />
        </div>
    );
};

export default Request;
