import { cloneElement, isValidElement } from "react";
import { useFocusTrap, useMergedRef } from "@rtdui/hooks";
import { VisuallyHidden } from "../VisuallyHidden";

export interface FocusTrapProps {
	/** Element at which focus should be trapped, should support ref prop */
	children: any;

	/** Determines whether focus should be trapped within child element */
	active?: boolean;

	/** Prop that should be used to access component ref */
	refProp?: string;
}

/** 焦点围栏组件
 * 
 * 焦点捕获逻辑
    如果active属性为true,焦点会被捕获到孩子元素中
    当FocusTrap组件被挂载或当active属性由false变为true时,第一个带有data-autofocus特性的元素被聚焦
    如果没有data-autofocus特性的元素,则第一个支持键盘导航的元素被聚焦
    如果目标元素没有可聚焦元素或不支持ref,那么焦点围栏将不起作用
    当FocusTrap孩子元素之外的元素被聚焦时,焦点围栏停止工作
 */
export function FocusTrap(props: FocusTrapProps): React.ReactElement {
	const { children, active = true, refProp = "ref" } = props;

	// 当激活时,第一个具有data-autofocus特性的孩子会得到焦点, 否则第一个可焦点孩子获得焦点.
	const focusTrapRef = useFocusTrap(active);
	const ref = useMergedRef(focusTrapRef, children?.ref);

	if (!isValidElement(children)) {
		return children;
	}

	return cloneElement(children, { [refProp]: ref });
}

/** 这是一个特殊的组件,只渲染sr-only元素. 当对话框打开时不想让任何元素获取焦点, 可将它作为第一个孩子. */
export function FocusTrapInitialFocus(
	props: React.ComponentPropsWithoutRef<"span">,
) {
	return <VisuallyHidden tabIndex={-1} data-autofocus {...props} />;
}

FocusTrap.displayName = "@rtdui/core/FocusTrap";
FocusTrapInitialFocus.displayName = "@rtdui/core/FocusTrapInitialFocus";

FocusTrap.InitialFocus = FocusTrapInitialFocus;
