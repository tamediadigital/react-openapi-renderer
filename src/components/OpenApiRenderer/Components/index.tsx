import React from "react";
import { Components as ComponentsModel } from "models/OpenApi";

type ComponentsProps = {
  components: ComponentsModel;
};

export default function Components({ components }: ComponentsProps) {
  console.log("COMPONENTS", components);
  return <div>Components</div>;
}
