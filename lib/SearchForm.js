import { useState } from 'react';

export default function SearchForm() {
  const [hits, setHits] = useState([]);

  const search = async (event) => {
    const q = event.target.value;

    if (q.length > 3) {
      const params = new URLSearchParams({ q });

      const res = await fetch('/api/search?' + params);

      const result = await res.json();
      console.log(result);
      setHits(result['answers']);
    }
  };

  return (
    <div>
      <input onChange={(e) =>{
        search(e)
      }} type="text" />

      <ul>
        {hits.map((hit) => (
            <li key={hit.entityId}>
              {hit.make} {hit.model}
            </li>
          ))}
      </ul>
    </div>
  );
}