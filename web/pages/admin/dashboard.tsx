import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: "/admin",
    permanent: false,
  },
});

export default function AdminDashboardRedirectRoute() {
  return null;
}
