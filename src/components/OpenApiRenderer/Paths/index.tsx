import React from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Paths as PathsModel,
  Tags as TagsModel,
  Components as ComponentsModel,
  UIHttp,
  Tag,
} from "models/OpenApi";
import { groupPathsByTags, getTag } from "../utils";

import Accordion from "components/Accordion";
import PathHeader from "../PathHeader";
import PathContent from "../PathContent";

type PathsProps = {
  paths: PathsModel;
  tags: TagsModel;
  components: ComponentsModel;
};

export default function Paths({ paths, tags, components }: PathsProps) {
  const pathsByTags = groupPathsByTags(paths);

  return (
    <div>
      {Object.entries(pathsByTags).map(
        ([tagName, pathGroups]: [string, UIHttp[]]) => {
          const tag: Tag | undefined = getTag(tagName, tags);
          return (
            <div key={uuidv4()} className='mb-4 mt-4'>
              <h1>{tagName}</h1>
              {tags && tag ? <p>{tag.description}</p> : null}
              <Accordion
                items={pathGroups.map((item: UIHttp) => {
                  return {
                    heading: (
                      <PathHeader
                        deprecated={item.deprecated}
                        method={item.method}
                        summary={item.summary}
                        pathname={item.pathname}
                      />
                    ),
                    content: (
                      <PathContent
                        deprecated={item.deprecated}
                        responses={item.responses}
                        parameters={item.parameters}
                        requestBody={item.requestBody}
                        components={components}
                      />
                    ),
                  };
                })}
              />
            </div>
          );
        }
      )}
    </div>
  );
}
