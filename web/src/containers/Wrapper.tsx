// (c) Tecnologico de Monterrey 2022, rights reserved.

const Wrapper = ({ children }: any): JSX.Element => {
  return (
    <main className="h-screen overflow-y-auto">
      <div className="container mx-auto grid">{children}</div>
    </main>
  );
};

export default Wrapper;
