import Layout from "../components/Layout";
import InfoProfile from "../components/InfoProfile";
import ConfigToken from "../components/ConfigToken";

export default function Profile() {
  return (
    <Layout title={"Perfil"} notHeader={true}>
      <main className="p-5 bg-gray-100">
        <InfoProfile />
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
