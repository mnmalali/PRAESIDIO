import Image from "next/image";
export function Mark() {
  return (
    <Image
      className="brand-mark"
      src="/praesidio-logo.png"
      width={48}
      height={48}
      alt=""
      sizes="48px"
    />
  );
}
