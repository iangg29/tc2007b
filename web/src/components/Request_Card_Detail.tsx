// (c) Tecnologico de Monterrey 2022, rights reserved.
import Label from "./Label";

const Request_Card = () => {
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl text-[#396FB1] font-bold">Proyecto: Titulo_Proyecto</h1>
      <img
        className="py-4 rounded-xl"
        src="https://infolibros.org/wp-content/uploads/2021/06/Libros-de-Artes-Visuales.jpg?ezimgfmt=ng%3Awebp%2Fngcb33%2Frs%3Adevice%2Frscb33-1"
        alt="art"
      />
      <p className="text-lg font-semibold tracking-tight text-gray-900">Realizado por: Autor_Proyecto</p>
      <div className="flex gap-2 pt-4">
        <p className="">Categorías:</p>
        <Label />
        <Label />
        <Label />
      </div>
    </div>
  );
};

export default Request_Card;
