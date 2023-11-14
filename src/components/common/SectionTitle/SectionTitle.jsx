export default function SectionTitle({ title, des }) {
  return (
    <div>
      <h2 className="text-[64px] Black-fontfamily font-black leading-[80px] mb-6 text-[#FFFFFF] uppercase">{title}</h2>
      <h3 className="text-2xl text-[#FFFFFF]">{des}</h3>
    </div>
  );
}
