// (c) Tecnologico de Monterrey 2022, rights reserved.
import Request_Card from "../components/Request_Card";
import Foot from "./includes/Footer";
import NavBar from "./includes/NavBar";

const Request = (): JSX.Element => {
    return (
        <div>
            <NavBar />
            <div className="h-auto w-full flex gap-4 pt-16 px-24">
                <div className="w-2/5 space-y-4">
                    <Request_Card />                    
                </div>
                <div className="pt-6">
                    <h2 className="text-lg text-[#396FB1] font-medium">Documentos</h2>
                    <p>Mod_Documento1</p>
                    <p>Mod_Documento2</p>
                    <p>Mod_Documento3</p>
                    <p>Mod_Documento4</p>
                    <p>Botones</p>
                </div>
            </div>
            <Foot />
        </div>
    );
};

export default Request;
