import { Header } from "@src/components/layouts/header";
import { Main } from "@src/components/layouts/main";
import { Footer } from "@src/components/layouts/footer";

import "../src/styles/globals.scss"

type Props = {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body className="bg-slate-900 text-slate-50">
        <div className="mx-auto flex min-h-screen max-w-sm flex-col sm:max-w-2xl md:max-w-3xl">
          <Header />
          <Main>{children}</Main>
          <Footer />
        </div>
      </body>
    </html>
  );
}