export default function Footer() {
  return (
    <footer className="">
      <div className="mx-auto w-3/4">
        <div className="  border-solid border-2 border-light-gray"></div>
        <p className="mt-4 font-light text-base		">
          © {new Date().getFullYear()} MetricTime . Todos los Derechos
          Reservados
        </p>
      </div>
    </footer>
  );
}
