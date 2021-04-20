import React from "react";

import { Info, Servers as ServersModel } from "../../../models/OpenApi";
import Servers from "../Servers";

type HeaderProps = {
  info: Info;
  servers: ServersModel;
  openApiVersion: string;
};

export default function Header({ info, servers, openApiVersion }: HeaderProps) {
  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h1>{info.title}</h1>
        <span>
          <small className='badge bg-secondary'>Version: {info.version}</small>
          <small className='ms-2 badge bg-success'>
            OpenApi: {openApiVersion}
          </small>
        </span>
      </div>
      <p>{info.description}</p>
      <div className='mt-2'>
        <Servers servers={servers} />
      </div>
    </div>
  );
}
