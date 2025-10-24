
export default function Home() {
  return (
    <div className="flex items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen flex-col items-center justify-between py-50 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-left">
          <h1 className="text-3xl font-semibold">
            Hello There! My name is Francis, and here is my technical assesment exam for the role
          </h1>
            <a
            className="flex h-12 items-center justify-center rounded-full border border-solid px-5"
            href="/users"
            target="_blank"
          >
            Click here to route to users
          </a>
        </div>
      </main>
    </div>
  );
}
