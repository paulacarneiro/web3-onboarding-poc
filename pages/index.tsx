import { useState, FormEvent } from "react";
import Card from "../components/Card";
import Connect from "../components/Connect";

export default function Home() {
  const [connected, setConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [actionType, setActionType] = useState<string>("user balance");
  const [network, setNetwork] = useState<string>("mainnet");
  const [data, setData] = useState<{ [key: string]: string | number }>({});

  const connect = () => setConnected(true);

  const handleSubmit = (ev: FormEvent, address: string, type: string, network: string) => {
    ev.preventDefault();

    setData({ balance: "5.439843 ETH" });
  };

  const handleChangeAddress = (ev: ChangeEvent<HTMLInputElement>) => setAddress(ev.target.value);

  const handleChangeNetwork = (ev: ChangeEvent<HTMLSelectElement>) => setNetwork(ev.target.value);

  const handleChangeAction = (ev: ChangeEvent<HTMLSelectElement>) => setActionType(ev.target.value);

  return (
    <div className="h-screen bg-gray-900">
      <main className="p-10">
        {connected ? (
          <div className="w-[60rem] mx-auto mt-32">
            <Card
              handleSubmit={handleSubmit}
              handleChangeNetwork={handleChangeNetwork}
              handleChangeAction={handleChangeAction}
              handleChangeAddress={handleChangeAddress}
            >
              <div>
                {Object.keys(data).map((key, idx) => (
                <p key={idx}>
                  {key} : {data[key]}
                </p>
              ))}
            </Card>
          </div>
        ) : (
          <div className="w-fit mx-auto mt-32">
            <Connect connect={connect} />
          </div>
        )}
      </main>
    </div>
  );
}
