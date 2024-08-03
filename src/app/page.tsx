export default function Hero() {
  return (
    <main className="h-screen no-doc-scroll md:doc-scroll bg-slate-900 flex pt-48 justify-center">
      <div className="flex flex-col gap-2 text-white-100 items-center max-w-lg text-center">
        <h1 className="text-2xl md:text-3xl font-bold uppercase">
          Pantry Tracker + AI
        </h1>
        <h2 className="text-xl md:text-2xl">
          Effortless Food Management System
        </h2>
        <p className="text-base text-white-200 p-5 font-semibold rounded-lg shadow-md">
          Pantry Tracker is a web app that helps you manage your food inventory
          and snacks efficiently. Easily monitor the quantity, category, and
          status of your pantry items to ensure you never run out of your
          favorite foods.
        </p>
      </div>
    </main>
  );
}
