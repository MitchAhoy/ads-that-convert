import Image from "next/image";

export default function ClientLogoGrid({
  logos,
  className = "",
  itemClassName = "",
  imageClassName = "",
  getImageClassName,
}) {
  return (
    <ul className={className}>
      {logos.map((logo) => (
        <li key={logo.src} className={itemClassName}>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={`w-auto object-contain ${imageClassName} ${
              getImageClassName ? getImageClassName(logo) : ""
            }`}
          />
        </li>
      ))}
    </ul>
  );
}
