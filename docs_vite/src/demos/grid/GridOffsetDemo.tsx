import { Grid } from "@rtdui/core";

export default function GridOffsetDemo() {
  return (
    <Grid>
      <Grid.Col span={3}>
        <div className="bg-sky-100 text-sky-600 text-center p-4">1</div>
      </Grid.Col>
      <Grid.Col span={3}>
        <div className="bg-sky-100 text-sky-600 text-center p-4">2</div>
      </Grid.Col>
      <Grid.Col span={3} offset={3}>
        <div className="bg-sky-100 text-sky-600 text-center p-4">3</div>
      </Grid.Col>
    </Grid>
  );
}
