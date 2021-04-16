import React from "react";

import { Servers as ServersModel } from "models/OpenApi";
import Icon from "components/Icon";

type ServersProps = {
  servers: ServersModel;
};

export default function Servers({ servers }: ServersProps) {
  if (!servers) {
    return null;
  }
  const handleClick = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <h6>Servers</h6>
      <ul className='list-group'>
        {servers.map((s) => (
          <li
            className='list-group-item d-flex justify-content-between align-items-center'
            key={s.url}
          >
            <span>
              {s.description && `${s.description}:`} {s.url}
            </span>
            <button
              type='button'
              className='btn btn-sm btn-primary'
              onClick={() => handleClick(s.url)}
            >
              <Icon name='copy' color='white' size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
