import { Indicator } from "@rtdui/core";

export default function IndicatorColorDemo() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Indicator badgeColor="primary">
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
      <Indicator badgeColor="secondary">
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
      <Indicator badgeColor="accent">
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
      <Indicator badgeColor="info">
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
      <Indicator badgeColor="success">
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
      <Indicator badgeColor="warning">
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
      <Indicator badgeColor="error">
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
    </div>
  );
}
