import Navbar from "./components/navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-6">
        <h2 className="text-primary text-2xl font-semibold">Bem-vindo!</h2>
        <p className="mt-2 text-gray-700">
          home
        </p>
      </main>
    </div>
  );
}

export default App;
