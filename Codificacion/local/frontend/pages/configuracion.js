import Layout from "../components/Layout";
import ConfigToken from "../components/ConfigToken";

export default function Configuration() {
  return (
    <Layout title={"Configuración"} notHeader={true}>
      <div className="p-5 bg-gray-100">
        <ConfigToken />
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
