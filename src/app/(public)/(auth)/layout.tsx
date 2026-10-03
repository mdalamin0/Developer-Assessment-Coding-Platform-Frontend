import GuestGuard from "@/components/guards/guest-guard";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <GuestGuard>{children}</GuestGuard>;
};

export default AuthLayout;
