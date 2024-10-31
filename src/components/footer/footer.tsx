import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-slate-100 py-6">
      <div className="container h-24 flex flex-col gap-3">
        <div className="flex items-center justify-between md:flex-row flex-col gap-3">
          <Link href={"/"}>
            <Image src="/logo.png" alt="logo" width={150} height={150} />
          </Link>
          <p className="text-slate-500">© 2024. Tous droits réservés.</p>
        </div>
        <div className="flex items-center justify-center md:flex-row flex-col gap-3">
          <p>
            Built and maintained by:{" "}
            <a className="text-blue-500" href="https://junior-asosa.vercel.app">
              Junior Asosa
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
