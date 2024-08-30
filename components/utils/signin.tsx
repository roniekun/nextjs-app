import Button from "./button";
export default function SignIn() {
  let isSignInActive = false;
  return (
    <>
      {isSignInActive && (
        <main className="backdrop-blur-sm flex fixed justify-center items-center top-1/2 -translate-y-1/2">
          <div className="flex flex-col p-[5vw] shadow-sm w-1/2 bg-neutral-200">
            <h1 className="text-2xl">header</h1>
            <h2 className="text-neutral-500 text-lg">subheader</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. A sint
              voluptatibus, voluptatem maiores dolores non ea saepe sunt
              perspiciatis, odio magnam distinctio illo necessitatibus, tempore
              eveniet. Nulla quaerat rem tempora?
            </p>
            <br />
            <Button name="continue" />
          </div>
        </main>
      )}
    </>
  );
}
