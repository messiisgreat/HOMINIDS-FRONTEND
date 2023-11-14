import Link from 'next/link';
import React from 'react';

export default function CategoryFilter({title}) {
  return (
    <ul className="category-filter">
      <li>
        <Link href="" className="active">
        {title}
        </Link>
      </li>
    </ul>
  );
}
