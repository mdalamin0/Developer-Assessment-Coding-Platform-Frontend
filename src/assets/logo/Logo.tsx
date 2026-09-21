import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex min-w-0 items-center gap-1.5 sm:gap-2"
    >
      <div className="shrink-0">
        <Image
          src="/logo-icon.png"
          alt="DevAssess Logo Icon"
          width={80}
          height={80}
          priority
          className="size-10 object-contain sm:size-12 lg:size-14"
        />
      </div>

      <div className="flex min-w-0 flex-col justify-center">
        <h1 className="text-xl font-bold leading-none tracking-tight text-gray-800 sm:text-2xl lg:text-3xl">
          <span className="dark:text-blue-50">Dev</span><span className="text-indigo-500">Assess</span>
        </h1>

        <p className="mt-0.5  whitespace-nowrap text-[10px] font-medium tracking-wide text-gray-400  lg:text-sm">
          Developer Assessment Platform
        </p>
      </div>
    </Link>
  );
}
