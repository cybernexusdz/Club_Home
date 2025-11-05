import Footer from "./component/Footer";
import Header from "./component/Header";
import EventSection from "./component/Events";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-navyDark to-purpleDeep text-textPrimary">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="p-8 min-h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Welcome to Cyber Nexus 🚀
          </h1>

          {/* Responsive Events Section */}
          <div className="mt-10">
            <EventSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
