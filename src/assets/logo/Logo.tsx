import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-1 group">
      <div className="flex-shrink-0">
        <Image
          src="/logo-icon.png"
          alt="DevAssess Logo Icon"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-none">
          Dev<span className="text-indigo-500">Assess</span>
        </h1>
        <p className="text-sm font-medium tracking-wide text-gray-400 mt-1 whitespace-nowrap">
          Developer Assessment Platform
        </p>
      </div>
    </Link>
  );
}
