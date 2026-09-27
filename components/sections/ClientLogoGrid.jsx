import Image from "next/image";

export default function ClientLogoGrid({
  logos,
  className = "",
  itemClassName = "",
  imageClassName = "",
  getImageClassName,
  style,
}) {
  return (
    <ul className={className} style={style}>
      {logos.map((logo, index) => (
        <li key={`${logo.src}-${index}`} className={itemClassName}>
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
