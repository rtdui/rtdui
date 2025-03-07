import { forwardRef, useImperativeHandle } from "react";
import { useUncontrolled } from "@rtdui/hooks";
import clsx from "clsx";

export interface Step {
	icon?: React.ReactNode;
	description: React.ReactNode;
}

export interface StepsProps {
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error";
	/** 步骤列表 */
	steps: Step[];
	/**
	 * 是否按顺序跳转, true时只能通过受控属性或api跳转, false时用户可以点击任意步骤跳转
	 * @default false
	 */
	sequential?: boolean;
	/** 非受控属性, 当前步骤 */
	defaultStep?: number;
	/** 受控属性, 当前步骤 */
	step?: number;
	/** 步骤改变时 */
	onChange?: (step: number) => void;
}

export const Steps = forwardRef<HTMLUListElement, StepsProps>((props, ref) => {
	const {
		steps,
		color = "success",
		sequential = false,
		defaultStep,
		step: stepProp,
		onChange,
	} = props;

	const [step, setStep] = useUncontrolled({
		defaultValue: defaultStep,
		value: stepProp,
		finalValue: 1,
		onChange,
	});

	useImperativeHandle<HTMLUListElement, any>(ref, () => ({
		next: () => {
			setStep(step + 1);
		},
	}));

	return (
		<div className="overflow-y-auto md:overflow-x-auto">
			<ul ref={ref} className="steps steps-vertical md:steps-horizontal">
				{steps.map((d, index) => (
					<li
						key={index}
						className={clsx("step", {
							"cursor-pointer": sequential === false,
							"step-primary": color === "primary" && index < step,
							"step-secondary": color === "secondary" && index < step,
							"step-accent": color === "accent" && index < step,
							"step-info": color === "info" && index < step,
							"step-success": color === "success" && index < step,
							"step-warning": color === "warning" && index < step,
							"step-error": color === "error" && index < step,
							"after:bg-info!": index + 1 === step,
						})}
						onClick={(e) => (sequential ? undefined : setStep(index + 1))}
					>
						{d.icon && <span className="step-icon">{d.icon}</span>}
						{d.description}
					</li>
				))}
			</ul>
		</div>
	);
});

Steps.displayName = "@rtdui/Steps";
