import { Button } from "@/components/site";
export default function NotFound() {
  return (
    <section className="section not-found">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>
        LET’S GET BACK
        <br />
        ON THE ROAD.
      </h1>
      <Button href="/">Return home</Button>
    </section>
  );
}
