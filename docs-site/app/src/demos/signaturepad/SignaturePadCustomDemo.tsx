import { SignaturePad, type SignaturePadHandle } from "@rtdui/signature-pad";
import { useRef } from "react";

export default function Demo() {
	const signPadRef = useRef<SignaturePadHandle>(null!);

	return (
		<SignaturePad
			ref={signPadRef}
			slots={{
				clearBtn:
					"w-20 h-8 min-h-0 p-1 bg-red-500 text-white hover:bg-red-700 rounded-full",
				confirmBtn:
					"w-20 h-8 min-h-0 p-1 bg-blue-500 text-white  hover:bg-blue-700 rounded-full",
			}}
		/>
	);
}

Demo.displayName = "SignaturePadCustomDemo";
