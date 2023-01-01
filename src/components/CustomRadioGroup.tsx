import React, { useImperativeHandle, useState } from "react";
import "./custom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

interface CustomRadioGroupProps {
  datasource?: number[];
  onChange?: (e: any) => void;
  enabled?: boolean;
}

export interface CustomRadioGroupHandles {
  selected: string;
  enabled: boolean;
  datasource: number[];
  clear: () => void;
}

type SizeProp =
  | "2xs"
  | "xs"
  | "sm"
  | "lg"
  | "xl"
  | "2xl"
  | "1x"
  | "2x"
  | "3x"
  | "4x"
  | "5x"
  | "6x"
  | "7x"
  | "8x"
  | "9x"
  | "10x";

const iconSize: SizeProp[] = [
  "2x",
  "2x",
  "3x",
  "4x",
  "4x",
  "5x",
];

const CustomRadioGroup = React.forwardRef<
  CustomRadioGroupHandles,
  CustomRadioGroupProps
>((props, ref) => {



  const [topping, setTopping] = useState<string>();
  const [ds, setDs] = useState<number[]>(props.datasource!)
  const [enabled, setEnable] = useState<boolean>(props.enabled!);

  useImperativeHandle(ref, () => ({
    set selected(v: string) {
      setTopping(v);
    },
    get selected(): string {
      return topping!;
    },
    set enabled(status: boolean) {
      setEnable(status);
    },
    get enabled(): boolean {
      return enabled;
    },
    clear(): void {
      setTopping("");
    },
    set datasource(datasource: number[]) {
      setDs(datasource)
    },
    get datasource(): number[] {
      return ds
    }
  }));

  const onOptionChange = (e: any) => {
    setTopping(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <>
      <Disabled disabled={!enabled}>
        <div className="body">
          {(ds! && ds.length > 0) ? (
            ds.map((v, i) => (
              <div className="card" key={v}>
                <label>
                  <input
                    type="radio"
                    name={v.toString()}
                    value={v.toString()}
                    id="v"
                    checked={topping === v.toString()}
                    onChange={onOptionChange}
                  />
                  <div className="card-view">
                    <div className="icon">
                      <FontAwesomeIcon icon={faCoins} size={iconSize[i]} />
                    </div>
                    <div className="text">
                      <h2 style={{fontSize: `${(i+5)*4}px`}}>{v} <span style={{fontSize: `${(i+5)*3}px`}}>₺</span></h2>
                    </div>
                  </div>
                </label>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </Disabled>
    </>
  );
});

interface PropsType {
  disabled: any;
  children: JSX.Element;
}

function Disabled({ disabled, children }: PropsType) {
  if (disabled) {
    return (
      <div style={{ opacity: 0.5, pointerEvents: "none" }}>{children}</div>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default CustomRadioGroup;
