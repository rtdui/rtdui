// import { type OutputOptions, rollup, type RollupOptions } from "rollup";

// export async function compile(config: RollupOptions) {
//   const bundle = await rollup(config);
//   const outputs: OutputOptions[] = Array.isArray(config.output)
//     ? config.output
//     : [config.output!];
//   return Promise.all(outputs.map((output) => bundle.write(output)));
// }

/**
 * 使用 rolldown 进行编译
 */
import { rolldown, type OutputOptions, type RolldownOptions } from "rolldown";

export async function compile(config: RolldownOptions) {
  const bundle = await rolldown(config);
  const outputs: OutputOptions[] = Array.isArray(config.output)
    ? config.output
    : [config.output!];
  return Promise.all(outputs.map((output) => bundle.write(output)));
}
