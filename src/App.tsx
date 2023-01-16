import { useRef, useState } from "react";
import CustomRadioGroup, {
  CustomRadioGroupHandles,
} from "./components/CustomRadioGroup";
import { Col, Row } from "antd";
import Button from "antd/es/button";
import Select from "antd/es/select";
import Input from "antd/es/input";

function App() {
  const values: number[] = [5, 10, 20, 50];

  const [value, setValue] = useState<number[]>(values);
  const [enable, setEnable] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0)
  const customRef = useRef<CustomRadioGroupHandles>(null);

  function gizle() {
    customRef.current!.enabled = !customRef.current!.enabled;
  }

  function handleChange(e: any): void {
    console.log(e.target.value);
    console.log("mg", customRef.current!.selected)
  }

  return (
    <>
    <Row>
      <Col span={24}>
      <CustomRadioGroup
        enabled={false}
        ref={customRef}
        // datasource={value}
        onChange={handleChange}
      />
      </Col>
    </Row>
    <Row>
      <Col span={2}>
        <Button onClick={gizle}>Gizle</Button>
      </Col>
      <Col span={2}>
      <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      onChange={(value: string) =>{
        customRef.current!.selected = value;
      }}
      options={[
        {
          value: "5",
          label: '5 ₺',
        },
        {
          value: '10',
          label: '10 ₺',
        },
        {
          value: '20',
          label: '20 ₺',
        },
        {
          value: '50',
          label: '50 ₺',
        },
        {
          value: "100",
          label: "100 ₺"
        },
        {
          value: "200",
          label: "200 ₺"
        }
      ]}
    />
      </Col>
      <Col span={4}>
      </Col>
      <Col span={4}>
        <Button onClick={() => {
          customRef.current!.clear()
        }} >Temizle</Button>
      </Col>
    </Row>
    <Row>
      <Col span={4}>
        <Button onClick={() =>{
          customRef.current!.datasource = values;
        }}>Datasource Load</Button>
      </Col>
    </Row>
    <Row>
    <Col><Button onClick={() => {
      setCount(count => count - 1)
    }}>-</Button></Col>
    <Col>
      <div style={{border: "2px solid #2f3e4f", borderRadius: "5px", padding: "10px", backgroundColor: "#485769", width: "64px"}}>
        <p style={{fontSize: "16px", fontWeight: "bold"}}>% {count}</p>
      </div>
    </Col>
    <Col><Button onClick={() => {
      setCount(count => count + 1)
    }}>+</Button></Col>
    </Row>
    </>
  );
}

export default App;
