import Hero from "./_components/home/hero";
import PopularTires from "./_components/product/popular";
import FindInstaller from "./_components/generals/findInstaller";

export default function Home() {
  return (
    <>
    <Hero />
    <PopularTires />
    <FindInstaller />
    
    
    {/* <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
   
     <h1 className="">
      Hello Next js project
      </h1>   
      </div> */}
    </>

  );
}
