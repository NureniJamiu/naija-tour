import SelectRegion from "@/components/preferences/SelectRegion";

const page = () => {

  return <div className="relative flex items-center justify-center max-w-4xl mx-auto h-screen p-4">
    <div className="relative">
        <div>
            <SelectRegion />
        </div>
    </div>
  </div>;
};

export default page;
