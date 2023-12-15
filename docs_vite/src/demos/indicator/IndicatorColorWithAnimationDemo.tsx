import { Indicator } from "@rtdui/core";

export default function IndicatorColorWithAnimationDemo() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Indicator badgeColor="primary" animation>
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
      <Indicator badgeColor="secondary" animation>
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
      <Indicator badgeColor="accent" animation>
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
      <Indicator badgeColor="info" animation>
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
      <Indicator badgeColor="success" animation>
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
      <Indicator badgeColor="warning" animation>
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
      <Indicator badgeColor="error" animation>
        <div className="w-20 h-20 bg-base-200 rounded-lg flex justify-center items-center">
          Content
        </div>
      </Indicator>
    </div>
  );
}
