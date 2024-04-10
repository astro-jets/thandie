import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ServicesComponent from "../components/services/Services";

const LandingPage = async () => {
    return (
        <div className="flex-col flex  overflow-x-hidden w-full">
            <Hero />
            <ServicesComponent />
            <Features />
            <Footer />
        </div>
    );
}

export default LandingPage;