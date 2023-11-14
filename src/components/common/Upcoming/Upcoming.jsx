import { SectionTitle } from '../../common';
import { NFTItem } from '../../common';

export default function Upcoming() {
  return (
    <div className="mt-32">
      <SectionTitle title="Upcoming" des="Explore the new creative economy" />
      <div className="mt-16 grid grid-cols-4 gap-4">
        <NFTItem />
      </div>
    </div>
  );
}
