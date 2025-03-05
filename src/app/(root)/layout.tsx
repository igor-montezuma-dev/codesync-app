import StreamVideoProvider from "@/components/providers/StreamClientProvider";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
}

export default Layout;
