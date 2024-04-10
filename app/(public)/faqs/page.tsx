import Features from "@/app/components/Features";
import SectionTitle from "@/app/components/Common/SectionTitle";
import SingleFeature from "@/app/components/Features/SingleFeature";
import featuresData from "@/app/components/Features/featuresData";

const Faqs = () => {
    return (
        <>
            <section
                id="Frequently Asked Question"
                className="bg-primary/[.03] py-4 md:py-20 lg:py-28"
            >
                <div className="">
                    <SectionTitle
                        title="Frequenlty Asked Questions"
                        paragraph="Here is a list of frequently asked questions."
                        center
                    />

                    <div className="w-full flex justify-center">
                        <div className=" w-11/12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                            {featuresData.map((feature) => (
                                <SingleFeature key={feature.id} feature={feature} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Faqs;